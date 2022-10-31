const express = require("express");
const {engine} =require("express-handlebars")
const router = require("./routes/index.js")
const{customers, mensajes} = require("./routes/index.js")
const {Server} = require("socket.io")
const fs = require('fs');
// defino puerto
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

// middlewares y engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.use(express.static('public'))


// websocket
const io = new Server(server);

//connections
io.on("connection",  (socket)=>{
    console.log('nuevo usuario', socket.id)

    io.sockets.emit('clientes', customers);
    io.sockets.emit('chat', mensajes);

    socket.broadcast.emit('nuevoUsuario')

    socket.on('nuevoCustomer', nuevoCustomer=>{
        customers.push(nuevoCustomer)
        fs.writeFileSync('./archivo.txt', JSON.stringify(customers))
        io.sockets._onServerSideEmit('lista', customers)
    })

    socket.on('newMsg', newMsj =>{
        console.log(newMsj);
        mensajes.push(newMsj)
        fs.writeFileSync('./mensajes.txt', JSON.stringify(mensajes))
        io.sockets.emit('chat', mensajes)
    })
    
});