var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/vote', function(req, res, next) {
    res.render('vote', {title: 'Vote'});
});

module.exports = router
