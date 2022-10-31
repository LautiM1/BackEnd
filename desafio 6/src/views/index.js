console.log('conectado');

const socketCliente = io();

const name = document.getElementById('name')
const age = document.getElementById('age')
const url = document.getElementById('url')

const enviar = document.getElementById('enviar')
const detalleCliente = document.getElementById('detalleCliente')

if (enviar){
    enviar.addEventListener('click',()=>{
        socketCliente.emit('nuevoCustomer',{
            nombre: name.value, 
            edad: age.value,
            url:url.value

        })
    })

    socketCliente.on('lista', (data) =>{
        let prod=''
        data.forEach(e =>{
            prod += `<tr>
            <td>${e.nombre}</td>
            <td>${e.eda}</td>
            <td><img src="${e.url}" alt="${e.nombre}"> </td>
            </tr>`
        });
        detalleCliente.innerHTML = prod
    })
}

const msj = document.getElementById('msj')
const chatHistorico = document.getElementById('chatHistorico')
const enviarMsj = document.getElementById('enviarMsj')
let user 


Swal.fire({
    title: 'Bienvenido/a',
    text:'Ingrese su Email',
    input:'email',
    allowOutsideClick: false,
}).then(res=>{
    user=res.value
})


if(msj){
    enviarMsj.addEventListener('click',e=>{
        socketCliente.emit('newMsg',{
            userEmail: user,
            message: msj.value,
            hora: new Date()
        })
        msj.value=''
    })
    
    //recibe los msj
    socketCliente.on('chat',(data)=>{
        let elemento = ''
        data.forEach(e => {
            elemento += `<p class='text-success'><strong class='text-primary'>${e.userEmail}</strong> <strong class='text-danger'>${e.hora}</strong>: ${e.message}</p>`
        });
        chatHistorico.innerHTML = elemento
    })
}