var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function(err, messages){
            if(err){
                return res.status(500).json({
                    title : 'An error occurred',
                    error : err
                });
            }
            res.status(200).json({
                message : 'Success',
                obj : messages
            });
        });
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error has occurred',
                error: err
            });    
        }
        var message = new Message({
            content : req.body.content,
            user : user
        });
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: err
                });    
            }
            user.messages.push(result);
            user.save();
            return res.status(201).json({
                title: 'Saved Message',
                obj : result
            }); 
        });
    });
});



module.exports = router;