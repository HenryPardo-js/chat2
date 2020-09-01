//io("http://localhost:3000/")
let socket=io()

let mensaje=document.getElementById('mensaje')
let usuario=document.getElementById('usuario')
let btn=document.getElementById('enviar')
let conversacion=document.getElementById('conversacion')
let acciones=document.getElementById('acciones')

btn.addEventListener('click',()=>{
    socket.emit('mensaje-cliente',{mensaje:mensaje.value,usuario:usuario.value})
    mensaje.value=''
})

mensaje.addEventListener('keypress',()=>{
    socket.emit('usuario-escribiendo',usuario.value)
})

socket.on('mensaje-servidor',(data)=>{
    acciones.innerHTML=''
    conversacion.innerHTML+=`<p><strong>${data.usuario}</strong> ${data.mensaje}</p>`
})

socket.on('usuario-escribiendo',(usuario)=>{
    acciones.innerHTML=`<p><strong>${usuario} </strong>escribiendo...</p>`
})

