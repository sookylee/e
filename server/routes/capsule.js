var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

var cookieParser = require('cookie-parser');
router.use(cookieParser());

// for date
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


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

//
router.post('/read', function(req,res){
    var arr = req.body.boxes;
    res.render('capsuleShow.html', {
        session: req.session,
        capsules: arr
    })
});



// now date 내려주기 --front 쪽에서 ajax로 받음
router.get('/time', function(req,res){
    var date = moment().format('YYYY-MM-DD');
    console.log(date);
    res.send(date);
});


module.exports = router;