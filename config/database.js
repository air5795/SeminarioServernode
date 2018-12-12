const mongoose = require('mongoose');
//mongoose.connectar('mongodb://user:password@127.0.0.1:27017/basededatos', function(error){
mongoose.connect('mongodb://127.0.0.1:27017/seminario', function(error){
    if(error) console.log(error);
    console.log("connection successful");
});