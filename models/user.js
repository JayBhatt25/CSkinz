const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    firstName: {type: String, required: [true, 'FirstName is required']},
    lastName: {type: String, required: [true, 'LastName is required']},
    email: {type: String, required: [true, 'Email is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']},
    offers: {type: [Schema.Types.ObjectId], ref: 'Skin' },
    watch: {type: [Schema.Types.ObjectId], ref: 'Skin' }
});

userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hashpass => {
        user.password = hashpass;
        return next();
    })
    .catch(err => next(err));
});

userSchema.methods.comparePass = function(plainPass){
    return bcrypt.compare(plainPass, this.password);
}
module.exports = mongoose.model('User', userSchema); 