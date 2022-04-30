const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    oItem: {type: Schema.Types.ObjectId, ref:"Skin", unique: [true, 'Item is already involved in trade.']},
    oFor: {type: Schema.Types.ObjectId, ref:"Skin", unique: [true, 'Item is already involved in trade.']},
    forUser: {type: Schema.Types.ObjectId, ref:"User"},
    byUser: {type: Schema.Types.ObjectId, ref:"User"},
    oStatus: {type: "String"}
})

module.exports = mongoose.model('Offer',offerSchema);