var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");

/* GET users listing. */
router.get('/vote/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(body) {
        res.render('vote', {title: 'Vote', election_name: body.inputTitle, statements: body.inputStatement, input_amount: body.inputAmount});
    });
});

router.post('/vote', function(req, res, next) {
    db.new_vote(req.body, req.body.inputTitle, function(err, doc) {
        console.log(doc);
    });
    
    res.redirect('/');
});

module.exports = router
