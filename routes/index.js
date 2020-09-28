var express = require('express');
var router = express.Router();

var db = require("../utils/db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    db.list_elections(function(rows) {
        res.render('index', { title: 'Awesome Quadratic Voting Page', elections: rows });
    });
});

module.exports = router;
