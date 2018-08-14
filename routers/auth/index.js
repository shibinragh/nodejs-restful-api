var express = require('express');
var router = express.Router();

 
var VerifyToken = require('./VerifyToken'); 
var controller = require('./controller'); 


router.post('/login', controller.login);
router.get('/me', VerifyToken, controller.me);
router.get('/list', controller.list);
router.post('/register', controller.register);
router.get('/logout', controller.logout);

 
module.exports = router;