var config = require('../config/config');
require('../config/passport');
var jwt = require('jsonwebtoken');
var User = require("./models").users;
module.exports={
    getfirstService:function(req,res,next){
        console.log(req.body)
        res.status(200)
        .json({
            message:"hola desde mi primer servicio",
            data:[1,2,3]
        });

    },
    /*testNosql:function(req,res,next){
      console.log(req.query.username)
      User.find({username:req.query.username},function(err,docs){
        if (err)
            console.log('error occured in the database');
        //console.log(docs);
        res.status(200)
        .json({
            message:"hola desde mi primer servicio",
            data:docs
        });
      }); 

    },*/
    signup:function(req,res,next){
      console.log(req.body)
        if (!req.body.email || !req.body.password) {
            res.status(401)
            .json({
                message:"Error por favor introduzca el email  y password"
            });    
          } else {
            var newUser = new User({
              username:req.body.email,
              firstName:req.body.name,
              fatherLastName:req.body.fatherlastname,
              motherLastName:req.body.motherlastname,
              ci:req.body.ci,
              password: req.body.password
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.status(401).json({success: false, message: 'email ya existe'});
              }
              res.status(200).json({success: true, message: 'Usuario creado con exito'});
            });
        }
    },
    signin:function(req,res,next){
        User.findOne({
            username: req.body.username
          }, function(err, user) {
            if (err) throw err;
        
            if (!user) {
              res.status(401).send({success: false, message: 'Authentication failed. User not found.'});
            } else {
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  var token = jwt.sign({username:user.username}, config.secret);
                  res.json({success: true, token:token});
                } else {
                  res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
                }
              });
            }
          });
    }
}