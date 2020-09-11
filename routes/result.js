var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/result', function(req, res, next) {
    res.render('result', {title: 'Election Result'});
});

module.exports = router
