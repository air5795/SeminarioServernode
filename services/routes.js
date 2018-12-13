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


router.post('/api/signup',querys.signup);//registro de usuarios
router.post('/api/signin',querys.signin);// iniciio de session
router.use(require('./middleware').checkAuth)//verificar autenticacion
router.use(require('./middleware').checkToken)//verificar token
router.post('/api/fileUpload', upload.single('image'), (req, res, next) => { // subir logos y fotos 
    res.status(200).json({success: true, message: 'Logo subido con exito',fileName:req.file.filename});
});
router.get('/api/get-username',querys.getUsernamme)//recuperar el username del usuario
router.post('/api/save-restaurant',querys.saveRestaurant)// guardar restaurante
router.get('/api/all-my-restaurant',querys.allMyRestaurant)//mostrar restaurantes por usuario
router.post('/api/view-restaurant',querys.viewRestaurant)// mostrar perfil del restaurantes
router.post('/api/create-menu',querys.createMenuRestaurant)// crear menu para restaurante
router.post('/api/show-menu',querys.showMenuRestaurant)// ver el menu del restaurante
router.get('/api/all-restaurant',querys.allRestaurants)// mostrar todos los restaurantes
router.post('/api/send-order',querys.sendOrderRestaurant)// enviar orden a restaurente
router.get('/api/view-order-username',querys.viewOrdersUsername)// ver ordenes por usuario
router.post('/api/view-order-restaurant',querys.viewOrderRestaurant)// ver ordenes por restaurante
router.post('/api/detail-view-order',querys.detailViewOrders)// detalle de las ordenes
router.post('/api/delete-restaurant',querys.deleteRestaurant)// Borrar Restaurante
router.post('/api/delete-menu-restaurant',querys.deleteElementMenu)// Borrar elemento del menu Restaurante
router.post('/api/update-send-order',querys.updateSendOrder)//actualizar orden a enviar
router.post('/api/update-delivered-order',querys.updateDeliveredOrder)//actualizar orden a Entregado
router.post('/api/update-cancel-order',querys.updateCancelOrder)//actualizar orden a Entregado

module.exports = router;