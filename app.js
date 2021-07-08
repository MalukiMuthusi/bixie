const express = require('express')
const cron = require('node-cron')
const fetchRecords = require('./cron_jobs/fetch_records')

const {
    helloWorldHandler,
    allStationsHandler,
    getStationDataHandler,
    stationHistoryHandler
} = require('./handlers/handlers')

const app = express()
const port = 8080

app.get('/', helloWorldHandler)

app.get('/api/v1/stations/', allStationsHandler)

app.get('/api/v1/stations/:st_id', getStationDataHandler)

app.get('/api/v1/stations/:stationID', stationHistoryHandler)

cron.schedule('0 0 * * * *', fetchRecords)

app.listen(port, () => {
    console.log(`Bixie server listening at http://localhost:${port}`)
})