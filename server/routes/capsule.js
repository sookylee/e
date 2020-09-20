var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

var cookieParser = require('cookie-parser');
router.use(cookieParser());




router.get('/write', function(req, res){
    res.render('writeLetter.html', {
        session: req.session
    });
});


router.get('/read', function(req,res){
    res.render('capsuleMain.html', {
        session: req.session
    });
});

router.get('/read/view', function(req, res){
    res.render('readLetter.html', {
        session: req.session
    })
});

module.exports = router;