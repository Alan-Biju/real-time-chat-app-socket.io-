const path=require("path");
const express=require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io=socketio(server);

/*--------------------------------------------*/
app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(socket)=>{
        io.emit('message','Welcome To ChatBuddy')


   socket.broadcast.emit('message','New User');
    console.log('new user');

socket.on('chatmessage',(data)=>{
    io.emit('message',data);
})
socket.on('keydown',(data)=>{
    socket.broadcast.emit('type',data);
})

io.on('disconnect',()=>{
    io.emit('message','a user exited')
})

})



const port = process.env.PORT||3000;

server.listen(port,()=>{
    console.log(`port is running http://localhost/${port} `)
})