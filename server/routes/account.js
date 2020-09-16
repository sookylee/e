var express = requie('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '00000000',
    database: 'name'
});
connection.connect();


