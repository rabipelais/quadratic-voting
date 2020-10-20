var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");
var csv = require("../utils/csv.js");
var fs = require('fs');

/* GET users listing. */
router.get('/vote/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(body) {
        res.render('vote', {title: 'Vote', election_id: body._id, election_name: body.electionTitle, statements: body.electionStatement, input_amount: body.electionTokenAmount, election_description: body.electionDescription});
    });
});

router.post('/vote', function(req, res, next) {
    db.new_vote(req.body, req.body.inputTitle, function(err, doc) {
        console.log(doc);
        res.redirect('/election/thanks');
    });
});

router.get('/votes/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(election_body) {
        db.get_votes_for_election(req.params.electionId, function(votes_body) {
            var csv_content = csv.to_csv(election_body, votes_body);
            
            const file_name = election_body.inputTitle + ".csv";
            
            fs.writeFile(file_name, csv_content, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
                
                res.download(file_name, file_name, function (err) {
                    if (err) {
                        console.log('Error downloading file.')
                    } else {
                        fs.unlink(file_name, function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        }); 
                    };
                });
            });
        });
    });
});

module.exports = router
