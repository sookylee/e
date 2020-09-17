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


router.get('/',function(req, res){
    return res.render('login.html');
});

//sign in
router.post('/', function(req, res){
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
                res.write("<script>alert('Please register first!')</script>");
                return res.write('<script>window.location="/register"</script>');
            }
        }
    });
});



module.exports = router;