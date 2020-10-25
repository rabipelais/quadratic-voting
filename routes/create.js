var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");

router.get('/create', function(req, res, next) {
    res.render('create', {title: 'Election Creator'});
});

router.post('/create', function(req, res, next) {
    db.new_election(req.body, req.body.electionTitle, function(err, doc) {
        console.log(doc);
    });
    
    res.redirect('/');
});

router.post('/delete/:electionId/:electionRev', function(req, res, next) {
    db.delete_election(req.params.electionId, req.params.electionRev, function(body) {
        db.get_votes_for_election(req.params.electionId, function(votes_body) {
            
            votes_body.docs.map((vote) => {
                console.log("Deleting vote: " + vote._id);
                db.delete_vote(vote._id, vote._rev, function(body) {
                    console.log("Deleted vote");
                })
            })
            
            res.redirect('/');
        });
    });
});

module.exports = router
