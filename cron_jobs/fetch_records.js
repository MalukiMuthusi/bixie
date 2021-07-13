const Promise = require('bluebird')
const mongoose = require('mongoose')
const { httpGet } = require('../handlers/handlers')
const { Pool } = require('pg')
const pool = new Pool()
const { Station } = require('../models/models')


function fetchRecords() {
    console.log('cron job running')
    const stationOptions = {
        hostname: 'kiosks.bicycletransit.workers.dev',
        port: 443,
        path: '/phl',
        method: 'GET'
    }

    httpGet(stationOptions)
        .then(res => {
            console.log(res)
            saveRecords(res)
        })
        .catch(err => {
            console.error(err)
            console.log('failed')
        })
}

async function dbConnect() {
    const options = {
        useNewUrlParser: true,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        autoIndex: false
    }
    var connection
    try {
        connection = await mongoose.connect(process.env.MONGO_URI, options)

    } catch (error) {
        console.log(error)
    }

    connection.on('error', err => {
        console.log(err)
    })

    connection.on('connected', err => {
        console.log('successfully connected to the database')
    })

    connection.on('disconnected', err => {
        console.log('disconnected' + err)
    })

    connection.on('close', err => {
        console.log('closed connection to the database')
    })

    return connection

}

async function saveRecords(data) {
    try {
        const stations = new Station();
        stations.features = data;
        const savedStation = await stations.save()
        console.log(savedStation)


    } catch (error) {
        console.log(error)
    }

}

module.exports = fetchRecords