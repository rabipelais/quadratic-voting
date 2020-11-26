function toCSV(election, votes) {
    var csv_rows = []

    var identities = ['Woman', 'Migration', 'Entrepreneur', 'LGBT', 'Researcher'];
    var header = ['Election name',  'Age', 'Sexual orientation', 'Occupation', 'Gender', 'Nationality'];

    header = header.concat(identities);
    header = header.concat(election.electionStatement.map(x => "1Vote " + x));
    header = header.concat(election.electionStatement.map(x => "Quadratic " + x));
    header.push("Max Tokens");
    header.push("Election ID");

    
    csv_rows.push(header);

    votes.docs.map(function(x) {
        
        var entries = Object.values(x);

        //This is gonna lead to inconsistencies, generate the fields from the headers
        var row = [election.electionName, x.voterAge, x.voterOrientation, x.voterOccupation, x.voterGender, x.voterNationality];

        //Add identities
        id_res = identities.map(i => {
            if(x.voterIdentity.includes(i.toLowerCase())) {
                return "Yes";
            } else {
                return "No";
            }
        });

        row = row.concat(id_res);

        //Add 1p1v
        //REALLY HACKY, TODO: do this properly
        row = row.concat(entries.slice(9, entries.length - 2))
        
        //Add Quadratic Votes
        row = row.concat(x.QuadraticVote);

        //Add some metadata
        row.push(election.electionTokenAmount);
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
