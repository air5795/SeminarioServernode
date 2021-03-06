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
        firstNameOwner: {type:String},
        lastNameOwner: {type:String},
        nit: {type:String},
        street: {type:String},
        phone: {type:String},
        latitude: {type:String},
        logitude: {type:String},
        logo: {type:String},
        createdAt: { type: Date, default: Date.now },
        photo: {type:String},
        menu: {type:
            [{
                name: {type:String},
                price: {type:Number},
                type:{type:String},
                photo: {type:String},
                createdAt: { type: Date, default: Date.now },
            }],
            default:[]},
        username:{type:String},
            
})

const orders = new Schema({
    idRestaurant: {type:String},
    username: {type:String},
    menu: {type:
        [{
            //id: {type:String},
            name: {type:String},
            price:{type:Number},
            type:{type:String},
            photo: {type:String},
        }],
        default:[]},
    Total:{type:Number},
    latitude: {type:String},
    logitude: {type:String},
    logoRestaurant:{type:String},
    state:{type:String,default:'RECIBIDO'},
    createdAt: { type: Date, default: Date.now }
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
    users:mongoose.model('users', users),
    restaurant:mongoose.model('restaurant', restaurant),
    orders:mongoose.model('orders', orders)
}