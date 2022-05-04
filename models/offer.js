const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    oItem: {type: Schema.Types.ObjectId, ref:"Skin"},
    oFor: {type: Schema.Types.ObjectId, ref:"Skin"},
    forUser: {type: Schema.Types.ObjectId, ref:"User"},
    byUser: {type: Schema.Types.ObjectId, ref:"User"},
    oStatus: {type: "String", enum: ['made','accepted','rejected']}
},{autoIndex: false} )

module.exports = mongoose.model('Offer',offerSchema);