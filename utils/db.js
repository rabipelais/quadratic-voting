var nano = require('nano')('http://localhost:5984');
const { v4: uuidv4 } = require('uuid');

nano.db.create('elections', function(err, body) {
  if (!err) {
      console.log('database elections created!');
  } else {
      console.log(err);
  }
});

var elections = nano.db.use('elections');

exports.new_election = function(doc, doc_name, done) {
    elections.insert(doc, uuidv4(), function(err, body) {
        console.log("Inserting " + doc_name);
        if (!err) {
            console.log("Created!");
            console.log(body);
           return done(null, doc);
        } else {
            console.log("failed");
            console.log(err);
            console.log(body);
           return done("Error inserting new element.");
        }
    });
};

exports.list_elections = function(done) {
    elections.list({include_docs:true}, function(err, body) {
        if(!err) {
            body.rows.forEach(function(doc) {
                console.log(doc);
            });
            done(body.rows);
        }
    });
};

exports.get_election = function(id, done) {
    elections.get(id, function(err, body) {
        if(!err) {
            console.log("Fetched: ");
            console.log(body);
            done(body);
        } else {
            console.log("Failed fetching.");
        }
    });
};
