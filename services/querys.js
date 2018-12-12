var config = require('../config/config');
require('../config/passport');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require("./models").users;
var Restaurant = require("./models").restaurant;

module.exports={
    getfirstService:function(req,res,next){
        console.log(req.body)
        res.status(200)
        .json({
            message:"hola desde mi primer servicio",
            data:[1,2,3]
        });

    },
    signup:function(req,res,next){
      //console.log(req.body)
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
      //console.log(req.body)
        User.findOne({
            username: req.body.username
          }, function(err, user) {
            if (err) throw err;
        
            if (!user) {
              res.status(401).send({success: false, message: 'El usuario no existe'});
            } else {
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  var token = jwt.sign({username:user.username}, config.secret);
                  res.status(200).json({success: true, token:token});
                } else {
                  res.status(401).send({success: false, message: 'Su Password no es correcto'});
                }
              });
            }
          });
    },
    saveRestaurant:function(req,res,next){
      token = req.headers['token']
      try {
        var decoded = jwt.verify(token,config.secret);   
        var newRestaurant = new Restaurant({
          name: req.body.name,
          firstNameOwner: req.body.inputNameOwner,
          lastNameOwner: req.body.inputLastNameOwner,
          nit: req.body.inputNit,
          street: req.body.inputStreet,
          phone: req.body.inputPhone,
          latitude:req.body.latitude,
          logitude:req.body.longitude,
          logo:req.body.fileLogo,
          photo:req.body.filePhoto,
          username:decoded.username
        });
        newRestaurant.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(401).json({success: false, message: 'Error al crear el restaurante'});
          }
          res.status(200).json({success: true, message: 'Restaurante creado correctamente'});
        });
      } catch(err) {
        console.log(err)
        res.status(401)
            .json({
                error: true,
                message:"Error de llave"
        });
      }      
    },
    allMyRestaurant:function(req,res,next){
      token = req.headers['token']
      try {
        var decoded = jwt.verify(token,config.secret);   
        Restaurant.find({username:decoded.username}).sort({createdAt:-1}).exec(
          function(err,result){
              if(err) throw err
              if(result.length >0 ){
                res.status(200).json({success: true, message: 'success',data:result});
              }else{
                res.status(404)
                  .json({
                      error: true,
                      message:"Error no tiene restaurantes registrados"
                });
              }
          }
        )
      } catch(err) {
        console.log(err)
        res.status(401)
            .json({
                error: true,
                message:"Error de llave"
        });
      }  
    },
    viewRestaurant:function(req,res,next){
      Restaurant.findOne({_id:req.body._id}).exec(
        function(err,result){
            if(err) throw err
            if(result != null ){
              res.status(200).json({success: true, message: 'success',data:result});
            }else{
              res.status(404)
                .json({
                    error: true,
                    message:"Error no tiene restaurantes registrados"
              });
            }
        }
      )
    },
    createMenuRestaurant:function(req,res,next){
      Restaurant.findOne({_id:req.body._id}, function (err, restaurant) {
          if (err) console.log(err);
          if(restaurant){
              menu = {
                    //_id:mongoose.Types.ObjectId(),
                    name: req.body.name,
                    price: parseInt(req.body.price),
                    type: req.body.type,
                    photo: req.body.filePhoto,
              }

              restaurant.menu.push(menu);

              restaurant.save(function (err, updateduser) {
                if (err) console.log(err);
                res.status(200)
                .json({
                    error: false,
                    message:"Todo bien!!!",
                });
              });
          }else{
              res.status(404)
              .json({
                  error: true,
                  message:"error al crear el menu",
              });
          }
      });
    },
    showMenuRestaurant:function(req,res,next){
      Restaurant.findOne({_id:req.body._id}).exec(
        function(err,result){
            if(err) throw err
            if(result != null ){
              result = result.menu
              res.status(200).json({success: true, message: 'success',data:result});
            }else{
              res.status(404)
                .json({
                    error: true,
                    message:"no existe el restaurante"
              });
            }
        }
      )
    },
    allRestaurants:function(req,res,next){
      Restaurant.find({}).sort({createdAt:-1}).exec(
        function(err,result){
            if(err) throw err
            if(result.length >0 ){
              res.status(200).json({success: true, message: 'success',data:result});
            }else{
              res.status(404)
                .json({
                    error: true,
                    message:"Error no tiene restaurantes registrados"
              });
            }
        }
      )
    }
}