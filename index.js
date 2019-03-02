var express = require('express');
var socket = require('socket.io');
var hbs = require('express-hbs')

// App setup
var app = express();


var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});


app.get('/admin', (req, res) => {
    res.sendFile(__dirname+ '/public/admin.html');
})

app.get('/users', (req, res) => {
    res.sendFile(__dirname+ '/public/users.html');
})

// Static files
app.use(express.static('public'));

var io = socket(server);

// Socket setup & pass server
io.on('connection', (socket) => {
    
    console.log('made socket connection', socket.id);
    
    // Handle chat event
    socket.on('broadcast', function(data){  
        console.log("data from server socket: ",data);
        io.sockets.emit('broadcast', data);
    });

    socket.on('broadcastMessage', function(data){  
        console.log("data from server socket: ",data);
        io.sockets.emit('broadcastMessage', data);
    });
});
