const mongoose = require('mongoose')
const { Schema } = mongoose;

const geometrySchema = new Schema({
    coordinates: [{
        type: Number
    }],
    type: { type: String }
});

const BikeSchema = new Schema({
    dockNumber: Number,
    isElectric: Boolean,
    isAvailable: Boolean,
    battery: Schema.Types.Decimal128
});


const propertiesSchema = new Schema({
    id: String,
    name: String,
    coordinates: [Number],
    totalDocks: Number,
    docksAvailable: Number,
    bikesAvailable: Number,
    classicBikesAvailable: Number,
    smartBikesAvailable: Number,
    electricBikesAvailable: Number,
    rewardBikesAvailable: Number,
    kioskStatus: String,
    kioskPublicStatus: String,
    kioskConnectionStatus: String,
    kioskType: Number,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressZipCode: String,
    bikes: [BikeSchema],
    closeTime: Date,
    eventEnd: Date,
    eventStart: Date,
    isEventBased: Boolean,
    isVirtual: Boolean,
    kioskId: Number,
    notes: String,
    openTime: Date,
    publicText: String,
    timeZone: String,
    trikesAvailable: Number,
    latitude: Schema.Types.Decimal128,
    longitude: Schema.Types.Decimal128
});

const featureSchema = new Schema({
    geometry: geometrySchema,
    type: { type: String },
    properties: propertiesSchema
})

const stationsSchema = new Schema({
    features: [featureSchema],
    type: { type: String }
})

const Station = mongoose.model('station', stationsSchema);


const Feature = mongoose.model('Feature', featureSchema)

const Bike = mongoose.model('Bike', BikeSchema)

const Geometry = mongoose.model('Geometry', geometrySchema);

module.export = { Geometry, Bike, Feature, Station }