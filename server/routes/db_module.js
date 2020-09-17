var express = require('express');
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

function db_insert(datas){
    var query = "INSERT INTO root (empNum,  phone, hireDate, openDate, pwd, money, company) VALUES (";
    
    for(i=0;i<datas.length;i++){
        query += "'"+ datas[i] + "'";
        if(i!=datas.length-1){
            query += ",";
        }
        else {
            query += ");";
        }
    }

    var connection = db_connect();
    connection.query(query, function(err, rows){
        console.log(rows);
        if(err){
            console.log(err);
            res.json(0);
        }
        else{
            res.json(1);
            console.log('[Success] new employee data has inserted in db.');
        }
        connection.end();
    });

    console.log("new employee data has inserted.");
}


function db_isValid(empNum){ //check if empNum already exists
    var connection = db_connect();
    var query1 = "SELECT empNum FROM root WHERE empNum='" + empNum + "';";
    var result = -1;
    connection.query(query1, function(err, res){
        if(err){
            console.log(err);
            res.json(0);
        }
        else {
            if(res.length > 0){
                result = 1;
            }
            else result = 0;
        }
    });
    connection.end();
    
    return result;
}

async function db_checkPwd(empNum, _pwd){
    var connection = db_connect();
    var query = "SELECT empNum FROM root WHERE empNum='" + empNum + "' and pwd='" + _pwd + "';";
    console.log(query);
    var result = -1;
    connection.query(query, async function(err, res){
        console.log(res.length+"hi");
        if(err){
            console.log(err);
            res.json(0);
        }
        else {
            if(res.length > 0){
                result = 1;
            }
            else result = 0;
        }
    });
    connection.end();
    
    return result;
}

function db_getData(empNum){
    var connection = db_connect();
    var query = "SELECT * FROM root WHERE empNum='" + empNum + "';";
    var datas = new Array();

    connection.query(query, function(err, res){
        if(err){
            console.log(err);
            throw err;
        }
        else {
            datas.push(res[0].empNum);
            datas.push(res[0].hireDate);
            datas.push(res[0].openDate);
            datas.push(res[0].money);
        }
    });
    connection.end();

    return datas;
}


module.exports = {
    db_connect : db_connect,
    db_insert : db_insert,
    db_isValid : db_isValid,
    db_checkPwd : db_checkPwd,
    db_getData : db_getData
};