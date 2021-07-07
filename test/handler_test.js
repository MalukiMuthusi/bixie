var assert = require('assert')
const sinon = require('sinon')
const {
    helloWorldHandler,
    allStationsHandler,
    getStationDataHandler,
    stationHistoryHandler
} = require('../handlers')

const routeResponse = {
    "Welcome": "Welcome to Bixie",
    "query_0": "/api/v1/stations?at=2017-11-01T11:00:00",
    "query_1": "/api/v1/stations/KIOSKIDGOESHERE?at=2017-11-01T11:00:00",
    "query_2": "/api/v1/stations/KIOSKIDGOESHERE?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily"
}

describe('hello world handler', function () {

    it('should return hello world json value', async function () {
        const req = {}
        const res = {
        }
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        await helloWorldHandler(req, res)
        assert.strictEqual(res.json.calledWith(routeResponse), true)
    })

})

describe('snapshot of all stations at the specified time', function () {
    it('should return data snapshot of all the stations at the provided time', async function () {
        const req = {
            query: {
                at: "2017-11-01T11:00:00"
            }
        }
        const res = {}
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        await allStationsHandler(req, res)

        const expectedRes = {
            "hello": "Hello World", "at": "2017-11-01T11:00:00"
        }
        assert.strictEqual(res.json.calledWith(expectedRes), true)

    })
})

describe('snapshot of one station over a range of times', function () {
    it('it should return data for a given station at the specified time', async function () {
        const req = {
            query: {
                at: "2017-11-01T11:00:00"
            },
            params: {
                st_id: "KIOSKIDGOESHERE"
            }
        }
        const res = {}
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        await getStationDataHandler(req, res)

        const expectedRes = { "hello": "Hello World", "at": "2017-11-01T11:00:00", "st_id": "KIOSKIDGOESHERE" }

        assert.strictEqual(res.json.calledWith(expectedRes), true)
    })
})

describe('snapshots of one station over a range of times', function () {
    it('should return all the historical data for the specified station between two timestamps', async function () {

        const from = "2017-11-01T11:00:00"
        const to = "2017-12-01T11:00:00"
        const frequency = "hourly"
        const stationID = "KIOSKIDGOESHERE"

        const req = {
            query: {
                from: from,
                to: to,
                frequency: frequency
            },
            params: {
                stationID: stationID
            }
        }

        const res = {}
        res.json = sinon.stub().returns(res)

        await stationHistoryHandler(req, res)

        const expectedRes = {
            "Hello": "Hello World",
            "from": from,
            "to": to,
            "station_id": stationID,
            "frequency": frequency
        }

        assert.strictEqual(res.json.calledWith(expectedRes), true)
    })
})