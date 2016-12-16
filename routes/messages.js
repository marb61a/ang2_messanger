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

module.exports = router;