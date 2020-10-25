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
    
    res.redirect('/');
});

router.post('/delete/:electionId/:electionRev', function(req, res, next) {
    db.delete_election(req.params.electionId, req.params.electionRev, function(body) {
        res.redirect('/');
    });
});

module.exports = router
