var User = require('./User');



//CREATES A NEW USER
 exports.create = function(req, res){
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
 };


 // RETURNS ALL THE USERS IN THE DATABASE
exports.list = function(req, res){
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.singleuser = function(req, res){   
    console.log(req.params.id);

    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
}

// DELETES A USER FROM THE DATABASE
exports.delete = function(req, res){      
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

//UPDATES A SINGLE USER IN THE DATABASE (findByIdAndUpdate)
exports.update = function(req, res){   
    console.log(req.body.name);  
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};

//UPDATES A SINGLE USER IN THE DATABASE (FindOneAndUpdate)
exports.update = function(req, res){   
    console.log(req.body.name);  
    User.findOneAndUpdate(req.params.name, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};

exports.test = function (req, res){
    console.log('testsd');
    res.send('Greetings from the Test controller!')
}