
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skinsSchema = new Schema({
    skin_name: {type:String, required:[true, 'naam toh bata re baba']},
    category: {type:String, required:[true, 'kidhar ka hai ye toh bata re baba']},
    owner:{type:String, required:[true, 'Kiska hai ye toh bata re baba']},
    img: {type:String, required:[true, 'shakal toh bata re baba']},
    desc: {type:String, required:[true, 'kundali toh bata re baba'], minlength: [10, 'sharma mat re 10 se zada me bata']},
   
}, {timestamps:true});

module.exports = mongoose.model('Skin',skinsSchema);