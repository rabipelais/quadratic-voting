function toCSV(election, votes) {
    var csv_rows = []

    var identities = ['Woman', 'Migration', 'Entrepreneur', 'LGBT', 'Researcher'];
    var header = ['Election name', 'Voter name', 'Sexual orientation', 'Age', 'Occupation', 'Gender', 'Nationality'];

    header = header.concat(identities);
    header = header.concat(election.inputStatement.map(x => "1Vote " + x));
    header = header.concat(election.inputStatement.map(x => "Quadratic " + x));
    header.push("Max Tokens");
    header.push("Election ID");

    
    csv_rows.push(header);

    votes.docs.map(function(x) {
        
        var entries = Object.values(x);
        
        var row = entries.slice(3, entries.length - 3); //ignore _id, _rev, electionId

        //Add identities
        id_res = identities.map(i => {
            if(x.identity.includes(i.toLowerCase())) {
                return "Yes";
            } else {
                return "No";
            }
        });

        row = row.concat(id_res);
        
        //Add 1-vote results
        vote = JSON.parse(x.Vote1);
        votes_single = election.inputStatement.map(i => "Null");
        votes_single[vote[0]] = vote[2];

        row = row.concat(votes_single);
        
        //Add Quadratic Votes
        row = row.concat(x.QuadraticVote);

        //Add some metadata
        row.push(election.inputAmount);
        row.push(election._id);
        
        csv_rows.push(row);
    });
    
    return csv_rows;
};

exports.to_rows = toCSV;

exports.to_csv = function(election, votes) {
    let csv_rows = toCSV(election, votes);
    
    let csv_content = csv_rows.map(e => e.join(",")).join("\n");

    return csv_content;
};
