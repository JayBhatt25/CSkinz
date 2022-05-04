
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skinsSchema = new Schema({
    skin_name: {type:String, required:[true, 'Skin name is required']},
    status: {type: String, enum: ['available', 'pending', 'traded']},
    category: {type:String, required:[true, 'Category is required']},
    owner:{type:Schema.Types.ObjectId, ref: 'User'},
    offereditem: {type: Schema.Types.ObjectId, ref:'Skin'},
    img: {type:String, required:[true, 'Image link/path is required']},
    desc: {type:String, required:[true, 'Description is required'], minlength: [50, 'Minimum 50 characters are required.']},
   
}, {timestamps:true});

module.exports = mongoose.model('Skin',skinsSchema);