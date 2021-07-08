const Promise = require('bluebird')
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