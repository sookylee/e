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
    res.render('login.html');
});

app.get('/register', function(req,res){
    res.render('register.html');
});

app.get('/manage', function(req, res){
    res.render('manage.html');
});

var path = require('path');
app.use(express.static(path.join(__dirname,'/../web')));
app.use('/script', express.static(__dirname + "/../CapBox/src/js"));
app.use('/json', express.static(__dirname + "/../CapBox/build/contracts"));


module.exports = app;