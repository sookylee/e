var express = require('express');
var app = express();

app.set('views',__dirname + '/../web');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var accountRouter = require('./routes/account.js');
var capsuleRouter = require('./routes/capsule.js');

//db connect
const models = require("./models/index.js");
models.sequelize.sync().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Database connect failed");
    console.log(err);
});

app.use('/', accountRouter);
app.use('/capsule', capsuleRouter);


var server = app.listen(8080, function(req, res){
    var port = server.address().port;

    console.log('listening at http://localhost:%s', port);
});


app.get('/',function(req, res){
    res.redirect('/main');
});


app.get('/manage', function(req, res){
    res.render('manage.html');
});


app.get('/main', function(req,res){
    res.render('mainPage.html', {
        session: req.session
    });
})



var path = require('path');
app.use(express.static(path.join(__dirname,'/../web')));
app.use('/script', express.static(__dirname + "/../CapBox/src/js"));
app.use('/json', express.static(__dirname + "/../CapBox/build/contracts"));


module.exports = app;