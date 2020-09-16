var express = require('express');
var app = express();

app.set('views',__dirname + '/../web');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8080, function(req, res){
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s%s', host, port);
});

app.get('/',function(req, res){
    res.render('test.html');
});

app.get('/login', function(req,res){
    res.render('login.html');
});

module.exports = app;