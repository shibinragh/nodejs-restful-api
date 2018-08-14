

var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var VerifyToken = require('./VerifyToken');

exports.register = function(req, res){

  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
        console.log('test');
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
}

exports.login = function (req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err) return res.status(500).send('Error on the server.');
        if(!user) return res.status(404).send('No user found.');
        var passwordIsValid   = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token })
    })
}

exports.me = function(req, res, next){

    console.log(req.body);
    User.findById(req.userId, { password: 0 }, function (err, user) {
        
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
 
}

exports.list = function(req, res){
    User.find({}, function(err, user){
        res.send(user[2].name);
    })
}

exports.logout = function(){
    res.status(200).send({ auth: false, token: null });
}

exports.test = function (req, res){
    console.log('testsd');
    res.send('Greetings from the Test controller!')
}



 

