var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");

router.get('/create', function(req, res, next) {
    res.render('create', {title: 'Election Creator'});
});

router.post('/create', function(req, res, next) {
    db.new_election(req.body, req.body.inputTitle, function(err, doc) {
        console.log(doc);
    });
    
    res.json(req.body);
});

module.exports = router
