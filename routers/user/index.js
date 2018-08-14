var express = require('express');
var router = express.Router();

var controller = require('./controller');


router.post('/', controller.create );
router.get('/list', controller.list );
router.get('/singleuser/:id', controller.singleuser );
router.post('/delete/:id', controller.delete );
router.put('/update/:id', controller.update );

module.exports = router;

