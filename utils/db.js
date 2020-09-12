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
