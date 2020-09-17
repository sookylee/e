var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const db_isValid = require('./db_module').db_isValid;
const db_checkPwd = require('./db_module').db_checkPwd;
const db_insert = require('./db_module').db_insert;

var mysql = require('mysql');
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);


function db_connect(){
    var connection = mysql.createConnection({
        host: 'localhost',
        user:'e',
        password: 'nh',
        database: 'root'
    });
    connection.connect();

    console.log("[Success] Connected with mySql.");

    return connection;
}


router.get('/login',function(req, res){
    return res.render('login.html');
});

//sign in
router.post('/login', function(req, res){
    var id = req.body.empnum;
    var pwd = req.body.pwd;

    var connection = db_connect();
    var query = "SELECT empNum FROM root WHERE empNum='" + id + "' and pwd='" + pwd + "';";
    //console.log(query);

    connection.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json(0);
            connection.end();
        }
        else {
            if(result.length > 0){
                connection.end();
                return res.redirect('/capsule/write');
            }
            else {
                connection.end();
                res.write("<script>alert('Please register first!');</script>");
                res.write('<script>window.location="/register";</script>');
            }
        }
    });
});

//get sign up page
router.get('/register', function(req,res){
    res.render('register.html');
});

//sign up
router.post('/register', function(req, res){
    var id = req.body.id;
    var pwd = req.body.pwd;
    var hiredate = req.body.hiredate;
    var tel = req.body.tel;

    //hard coding :(
    var tmpDate = req.body.hiredate.split('-');
    var opendate = (parseInt(tmpDate[0])+3).toString()+"-"+tmpDate[1]+"-"+tmpDate[2];
    var money = 2243818640217;
    var company = "농협정보시스템";
    var datas = [id, tel, hiredate, opendate, pwd, money, company];

    var connection = db_connect();

    //check if empNum already exists in db 
    var query1 = "SELECT empNum FROM root WHERE empNum='" + id + "';";
    connection.query(query1, function(err, result){
        if(err){
            console.log(err);
            res.json(0);
            return;
        }
        else {
            if(result.length > 0){
                res.write("<script>alert('You already registered! Please sign in.');</script>");
                res.write("<script>window.location='/login';</script>");
                connection.end();
                return;
            }
            else {
                // insert datas in db
                var query = "INSERT INTO root (empNum, phone, hireDate, openDate, pwd, money, company) VALUES (";
                for(i=0;i<datas.length;i++){
                    query += "'"+ datas[i] + "'";
                    if(i!=datas.length-1){
                        query += ",";
                    }
                    else {
                        query += ");";
                    }
                }
                connection.query(query, function(err, rows){
                    console.log(rows);
                    if(err){
                        console.log(err);
                        res.json(0);
                    }
                    else{
                        console.log('[Success] new employee data has inserted in db.');
                        res.write("<script>alert('Welcome! Now write your Capsule on Blockchain.');</script>");
                        res.write("<script>window.location='/capsule/write';</script>");
                    }
                });
                connection.end();
                console.log("new employee data has inserted.");
            }
        }
    });
   
});


module.exports = router;