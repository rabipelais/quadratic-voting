var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");
var fs = require('fs');

/* GET users listing. */
router.get('/vote/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(body) {
        res.render('vote', {title: 'Vote', election_id: body._id, election_name: body.inputTitle, statements: body.inputStatement, input_amount: body.inputAmount});
    });
});

router.post('/vote', function(req, res, next) {
    db.new_vote(req.body, req.body.inputTitle, function(err, doc) {
        console.log(doc);
    });
    
    res.redirect('/');
});

function toCSV(election, votes) {
    var csv_rows = []

    var header = ['Election name', 'Voter name', 'Sexual orientation', 'Age', 'Occupation', 'Gender', 'Political orientation', 'Nationality'];
    
    header = header.concat(election.inputStatement.map(x => "1Vote " + x));
    header = header.concat(election.inputStatement.map(x => "Quadratic " + x));
    header.push("Max Tokens");
    header.push("Election ID");

    
    csv_rows.push(header);

    votes.docs.map(function(x) {
        var entries = Object.values(x);
        var row = entries.slice(3, entries.length - 1);
        row = row.concat(x.QuadraticVote);
        row.push(election.inputAmount);
        row.push(election._id);
        csv_rows.push(row);
    });

    let csv_content = "data:text/csv;charset=utf-8," 
        + csv_rows.map(e => e.join(",")).join("\n");
    
    return csv_content;
}

router.get('/votes/:electionId', function(req, res, next) {
    db.get_election(req.params.electionId, function(election_body) {
        db.get_votes_for_election(req.params.electionId, function(votes_body) {
            var csv_content = toCSV(election_body, votes_body);
            
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
