const Promise = require('bluebird')
const mongoose = require('mongoose')
const { httpGet } = require('../handlers/handlers')
const { Pool } = require('pg')
const pool = new Pool()


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
        keepAliveInitialDelay: 300000
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

}

async function saveRecords(data) {
    try {
        const client = await pool.connect()

        try {
            const queryText = 'INSERT INTO bixie.stations(id, name) VALUES($1, $2) RETURNING *'
            const values = [data.features[0].properties.id, data.features[0].properties.name]

            const res = await client.query(queryText, values)
            console.log(res.rows[0])

        } catch (error) {
            console.log(error.stack)
        } finally {
            client.release()
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = fetchRecords