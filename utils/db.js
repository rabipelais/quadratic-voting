var nano = require('nano')('http://admin:021991312@localhost:5984');
const { v4: uuidv4 } = require('uuid');

nano.db.create('elections', function(err, body) {
  if (!err) {
      console.log('database elections created!');
  } else {
      console.log('ERROR: creating database elections!');
      console.log(err);
  }
});

nano.db.create('votes', function(err, body) {
  if (!err) {
      console.log('database votes created!');
  } else {
      console.log('ERROR: creating database votes!');
      console.log(err);
  }
});

var elections = nano.db.use('elections');
var votes = nano.db.use('votes');

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

exports.get_number_votes_for_elections = function(elections, done) {
    function q(i) {
        var t = {selector: {
            electionId: {"$eq": i},
        }};
        return t;
    }
    
    queries = elections.map(e => {
	return votes.find(q(e.id))
    });

    Promise.all(queries).then((values) => {
	done(values.map(v => v.docs.length));
    });
};

exports.get_votes_for_election = function(id, done) {
    const q = {
        selector: {
            electionId: {"$eq": id},
        }
    }
    votes.find(q, function(err, body) {
        console.log('Finding with query: ');
        console.log(q);
        if(!err) {
            console.log("Getting votes for election: " + id);
            console.log(body);
            done(body);
        } else {
            console.log("Failed finding votes for: " + id);
        }
    })
}

exports.new_vote = function(doc, doc_name, done) {
    votes.insert(doc, uuidv4(), function(err, body) {
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
