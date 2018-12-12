var express = require('express');
var querys = require("./querys");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() +'-'+ file.originalname)
    }
});
var upload = multer({storage: storage});
var router = express.Router();


router.post('/api/signup',querys.signup);
router.post('/api/signin',querys.signin);
//router.use(require('./middleware').checkAuth)
//router.use(require('./middleware').checkToken)
router.post('/api/fileUpload', upload.single('image'), (req, res, next) => {
    res.status(200).json({success: true, message: 'Logo subido con exito',fileName:req.file.filename});
});
router.post('/api/save-restaurant',querys.saveRestaurant)
router.get('/api/all-my-restaurant',querys.allMyRestaurant)
router.post('/api/view-restaurant',querys.viewRestaurant)
router.post('/api/create-menu',querys.createMenuRestaurant)
router.post('/api/show-menu',querys.showMenuRestaurant)
router.get('/api/all-restaurant',querys.allRestaurants)

module.exports = router;