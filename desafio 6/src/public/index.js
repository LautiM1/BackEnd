console.log("javascript funcionando");

const socketClient = io();

let user;
Swal.fire({
    title:"Hola",
    text:"bienvenido, ingresa su email",
    input:"text",
    allowOutsideClick:false
}).then(respuesta=>{
    // console.log(respuesta)
    user = respuesta.value;
});

// guardar un usuario
const productFrom = document.getElementById("productForm");
productFrom.addEventListener("submit",(evt)=>{

    evt.preventDefault();
    const product ={
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    }

    socketClient.emit("newClient", product);
})

const createTable = async(data)=>{
    const response = await fetch("./templates/table.hbs");
    const result = await response.text();
    const templates = Handlebars.compile(result);
    const html = templates({products:data});
    return html;
}
const productsContainer = document.getElementById("productsContainer");
socketClient.on("products",async(data)=>{
    // console.log(data)
    //generar el html basado en la plantilla de hbs con todos los productos
    const htmlProducts = await createTable(data);
    productsContainer.innerHTML = htmlProducts;
})

//logica del chat
//enviar el mensaje desde el cliente
const campo = document.getElementById("messageField")
campo.addEventListener("keydown",(evt)=>{
    // console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            userEmail:user,
            message:campo.value,
            hora: new Date()
        })
        campo.value ="";
    }
})

//mostrar los mensajes cuando el usuario carga la página
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<p class='text-success'><strong class='text-primary'>${item.userEmail}</strong> <strong class='text-danger'>${item.hora}</strong>: ${item.message}</p>`;
        
    });
    messageContainer.innerHTML = elementos;
})
