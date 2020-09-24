var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


var cookieParser = require('cookie-parser');
router.use(cookieParser());

// for date
var moment = require('moment');
const session = require('express-session');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const ejsLint = require('ejs-lint');


router.get('/write', function(req, res){
    res.render('writeLetter.html', {
        session: req.session
    });
});


router.get('/read', function(req,res){
    //
    req.session.boxes=[];
    res.render('capsuleMain.html', {
        session: req.session
    });
});

router.get('/read/view', function(req, res){
    var arr = req.session.res;
    req.session.res = [];
    res.render('readLetter.html', {
        session: req.session,
        datas: arr
    })
});


router.post('/read/view', function(req, res){
    var arr = req.body.boxes;
    req.session.res = arr;
    console.log("here");
    console.log(arr);
    res.send(arr);
})


//
router.post('/read', function(req,res){
    //console.log(req);
    //console.log(req.body);
    var arr = req.body.boxes;
    req.session.boxes = arr;
    console.log(req.session.boxes);
    res.send(arr);
});

router.get('/read/choice', function(req,res){
    res.render('capsuleChoice.html', {
        session: req.session
    });
});



// now date 내려주기 --front 쪽에서 ajax로 받음
router.get('/time', function(req,res){
    var date = moment().format('YYYY-MM-DD');
    console.log(date);
    res.send(date);
});


module.exports = router;