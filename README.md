# Bixie

Implementation of Bixie server as per the interview specification.

You can access the API server at [http://bixie.sharehen.com/](http://bixie.sharehen.com/)

I have deployed the server to a virtual machine from digital ocean. I have installed Postgres database on the server machine.

I am using Github actions to run the tests and build the docker image and push it to the docker hub.

The API server has cron job that runs once every hour and fetches records from the [https://www.rideindego.com/stations/json/](https://www.rideindego.com/stations/json/) and updates the local database.

When the API server receives a request it checks the local database for the requested data, if the data is not available it will try and fetch from the remote API.
