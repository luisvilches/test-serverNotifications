/**
 * Created by cardumen on 13-07-17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socket(server);

io.set('origins', '*:*');


//app.use(formidable());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({
    extended: true
}));
app.set('view engine', 'pug');
app.set('views' , './views');
app.use(express.static('./static'));


server.listen(1989, function(err){
    if(err){console.log(err)}
    else{console.log('conectado con exito!!')}
});

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/push', function(req,res){

    console.log(req.body);

    let objNoty = {
        title: req.body.title,
        url: req.body.url,
        configuration: {
            icon: req.body.icon,
            body: req.body.description,
            dir: 'ltr'
        }
    };

    io.sockets.emit('newNotify',objNoty);
    res.redirect('/');
});