const express = require('express')
const app = express()
const port = 3000

app.get('/', helloWorldHandler)

function helloWorldHandler(req, res, next) {
    res.json({
        "Welcome": "Welcome to Bixie",
        "query_0": "/api/v1/stations?at=2017-11-01T11:00:00",
        "query_1": "/api/v1/stations/KIOSKIDGOESHERE?at=2017-11-01T11:00:00",
        "query_2": "/api/v1/stations/KIOSKIDGOESHERE?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily"
    })
    next()
}


app.get('/api/v1/stations/', allStationsHandler)

// snapshot of all stations at a specific time
function allStationsHandler(req, res, next) {
    var at = req.query.at
    res.json({ "hello": "Hello World", "at": at })
    next()
}


app.get('/api/v1/stations/:st_id', getStationDataHandler)

// return data for specific station and at the provided time
function getStationDataHandler(req, res, next) {
    var at = req.query.at
    var stationID = req.params.st_id
    res.json({ "hello": "Hello World", "at": at, "st_id": stationID })
    next()
}

app.get('/api/v1/stations/:stationID', stationHistoryHandler)

// return all the historical data between two timestamps for a specific station 
function stationHistoryHandler(req, res, next) {
    var from = req.query.from
    var to = req.query.to
    var frequency = req.query.frequency
    var stationID = req.params.stationID

    res.json({
        "Hello": "Hello World",
        "from": from,
        "to": to,
        "station_id": stationID,
        "frequency": frequency
    })

    next()
}

// TODO: add an handler for the endpoint
//  /api/v1/stations/KIOSKIDGOESHERE?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily


app.listen(port, () => {
    console.log(`Bixie server listening at http://localhost:${port}`)
})