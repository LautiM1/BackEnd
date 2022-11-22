const express = require("express");
const {Server} = require("socket.io")
const Customers = require("./components/Customers");

const clientService = new Customers("productos.txt")

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

const io = new Server(server);

app.use(express.static(__dirname+"/public"));

const historicoMensajes = [];


//websockets

io.on("connection", async(socket)=>{
    console.log("nuevo usuario conectado", socket.id);

    //enviamos todos los productos al usuario cuando se conecte.
    socket.emit("products", await clientService.getAll())

    //recibimos nuevo cliente
    socket.on("newClient", async(data)=>{
        await clientService.save(data);
        io.sockets.emit("products", await clientService.getAll());
    })

    //enviar a todos menos socketconectado
    socket.broadcast.emit("newUser");

    //enviamos historal de mensajes
    socket.emit("historico", historicoMensajes);

    //recibimos mensajes
    socket.on("message", data=>{
        console.log(data);
        historicoMensajes.push(data);

        io.sockets.emit("historico", historicoMensajes);
    })
})