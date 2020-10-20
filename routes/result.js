var express = require('express');
var router = express.Router();
var csv = require("../utils/csv.js");
var db = require("../utils/db.js");

/* GET users listing. */

router.get('/result/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(election_body) {
        db.get_votes_for_election(req.params.electionId, function(votes_body) {
            
            var rows = csv.to_rows(election_body, votes_body);

            var title = election_body.electionTitle;
            var header = rows[0].slice(1); //don't count election name in first entry
            var data = rows.slice(1).map(i => i.slice(1));
            
            console.log(header);
            console.log(data);
            
            res.render('result', {title: title, header: header, data: data});
        });
    });
});

module.exports = router
