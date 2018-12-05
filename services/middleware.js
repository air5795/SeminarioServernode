var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
require('../config/passport')(passport);
module.exports={
    checkAuth:function(req,res,next){
        passport.authenticate('jwt', {
            session: false
        }, function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({
                    "message": 'No autorizado inicie session'
                });
    
            } else {
                return next();
            }
        })(req, res, next);
    },
    checkToken:function(req,res,next){
        const token = req.headers['token']
        jwt.verify(token,config.secret, function(err, decoded) {
            if (err) {
                res.status(401).send({
                    "message": 'Error de token'
                });
            }else{
                next();    
            }
        });
    }
}