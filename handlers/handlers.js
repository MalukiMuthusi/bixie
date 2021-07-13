const Promise = require('bluebird')
const https = Promise.promisifyAll(require('https'))

async function helloWorldHandler(req, res) {
    res.json({
        "Welcome": "Welcome to Bixie",
        "query_0": "/api/v1/stations?at=2017-11-01T11:00:00",
        "query_1": "/api/v1/stations/KIOSKIDGOESHERE?at=2017-11-01T11:00:00",
        "query_2": "/api/v1/stations/KIOSKIDGOESHERE?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily"
    })
}

// snapshot of all stations at a specific time
async function allStationsHandler(req, res) {
    var at = req.query.at

    const stationOptions = {
        hostname: 'kiosks.bicycletransit.workers.dev',
        port: 443,
        path: '/phl',
        method: 'GET'
    }

    const weatherOptions = {
        hostname: 'api.openweathermap.org',
        port: 443,
        path: `/data/2.5/weather?q=Philadelphia&appid=${process.env.WEATHER_API}`,
        method: 'GET'
    }


    Promise.all([httpGet(weatherOptions), httpGet(stationOptions)])
        .then(([weather, stations]) => {
            res.json({
                'at': at,
                'weather': weather,
                'stations': stations
            })
        })
        .catch(err => {
            res.json({
                'error': err.toString()
            })
        })

}

// makes a network call to the indego API server
async function httpGet(options) {
    return new Promise(function (resolve, reject) {
        let data = ''
        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                reject(Error(`did not get ok from server, returned ${res.statusCode} from ${options.hostname}`))
            }

            res.on('data', (chunk) => {
                data += chunk
            });

            res.on('close', () => {
                data = JSON.parse(data)
                resolve(data)
            })
        })

        req.end();
        req.on('error', (err) => {
            reject(err)
        })
    })
}


// return data for specific station and at the provided time
async function getStationDataHandler(req, res) {
    var at = req.query.at
    var stationID = req.params.st_id
    res.json({ "hello": "Hello World", "at": at, "st_id": stationID })
}

// return all the historical data between two timestamps for a specific station 
async function stationHistoryHandler(req, res) {
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

}

module.exports = {
    helloWorldHandler,
    allStationsHandler,
    getStationDataHandler,
    stationHistoryHandler,
    httpGet
}