var express = require('express');
var querys = require("./querys");
var router = express.Router();
router.post('/api/signup',querys.signup);
router.post('/api/signin',querys.signin);
//router.get('/nosql',querys.testNosql);
/////// middleware para ver si inicio session  y tiene token ///////
//router.use(require('./middleware').checkAuth)
//router.use(require('./middleware').checkToken)
/////// ---------------------------------------------------- ///////
router.post('/api/getfirstService',querys.getfirstService);
module.exports = router;