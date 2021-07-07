const express = require('express')

const {
    helloWorldHandler,
    allStationsHandler,
    getStationDataHandler,
    stationHistoryHandler
} = require('./handlers')

const app = express()
const port = 3000

app.get('/', helloWorldHandler)

app.get('/api/v1/stations/', allStationsHandler)

app.get('/api/v1/stations/:st_id', getStationDataHandler)

app.get('/api/v1/stations/:stationID', stationHistoryHandler)

app.listen(port, () => {
    console.log(`Bixie server listening at http://localhost:${port}`)
})