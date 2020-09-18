var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const models = require('./../models');

var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var mysqlStore = require('express-mysql-session')(session);


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

router.use(cookieParser());


router.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000*60*60
    }
}));



router.get('/login',function(req, res){
    let session = req.session;

    res.render("login.ejs", {
        session: session
    });
});

//sign in
router.post('/login', function(req, res){
    var id = req.body.empnum;
    var pwd = crypto.createHash("sha512").update(req.body.pwd).digest("hex");


    //find info in db
    let result = models.user.findOne({
        where: {
            empnum: id
        }
    }).then((response) => {
        if(response == null){
            console.log("[ERROR] need register first.");
            res.write("<script>alert('[Error] You need Sign up first!')</script>");
            res.write("<script>document.location='/login'</script>");
            return;
        }

        let ssesPwd = response.dataValues.pwd;
        if(ssesPwd === pwd){
            console.log("[SUCCESS] sign in completed.");
            //set session
            req.session.empnum = id;
            req.session.hiredate = response.dataValues.hiredate;
            req.session.opendate = response.dataValues.opendate;
            req.session.money = response.dataValues.money;

            res.redirect("/login");
        }
        else {
            console.log("[Error] wrong password.");
            res.write("<script>alert('[Error] Wrong password!')</script>");
            res.write("<script>document.location='/login'</script>");
        }
        
    }).catch((err) =>{
        console.log(err);
    });

    

    
});

//get sign up page
router.get('/register', function(req,res){
    res.render('register.html', {
        session: session
    });
});

//sign up
router.post('/register', async function(req, res){
    if(req.session.empNum){
        res.redirect("/login");
        return;
    }

    var id = req.body.id;
    var pwd = crypto.createHash("sha512").update(req.body.pwd).digest("hex");
    var tel = req.body.tel;


    //hard coding :(
    var tmpDate = req.body.hiredate.split('-');

    var hiredate = parseInt(tmpDate[0]+tmpDate[1]+tmpDate[2]);
    var opendate = (parseInt(tmpDate[0])+3).toString()+tmpDate[1]+tmpDate[2];

    var money = 2243818640217;
    var company = "농협정보시스템";

    //session
    let result = models.user.create({
        empnum: id,
        pwd: pwd,
        hiredate: hiredate,
        opendate: opendate,
        money: money
    });

    
    //push in db
    models.user.create({
        empNum: id,
        phone: tel,
        pwd: pwd,
        money: money,
        company: company,
        hiredate: hiredate,
        opendate: opendate
    }).then(result => {
        res.write("<script>alert('Welcome! register completed.')</script>");
        res.write("<script>document.location='/login'</script>");
    }).catch(err => {
        console.log(err);
    })
});



module.exports = router;