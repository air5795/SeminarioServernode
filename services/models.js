var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var users = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    fatherLastName:{
        type: String,
        required: true
    },
    motherLastName:{
        type: String,
        required: true
    },
    ci:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const restaurant = new Schema({
        name: {type:String},
        owner: {type:String},
        nit: {type:String},
        street: {type:String},
        phone: {type:Number},
        latitude: {type:String},
        logitude: {type:String},
        logo: {type:String},
        createdAt: {type:Date},
        photo: {type:String},
        menu: 
            [{
                name: {type:String},
                price: {type:Number},
                descrition: {type:String},
                createdAt: {type:Date},
                photo: {type:String},
            }]
})

users.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

users.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            console.log(err)
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = {
    users:mongoose.model('users', users)
}