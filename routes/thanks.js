var express = require('express');
var router = express.Router();

router.get('/thanks', function(req, res, next) {
    res.render('thanks', {title: "Title"});
});

module.exports = router;
