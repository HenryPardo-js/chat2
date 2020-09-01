
const path = require('path')
const express = require('express')
const app = express()
const socketIO = require('socket.io')

app.set('port',process.env.PORT || 3000)

//Permitir que express tenga acceso a archivos del cliente
app.use(express.static(path.join(__dirname, '..','client')))

const server=app.listen(app.get('port'),()=>{
    console.log('Servidor http://localhost:3000/')
})

const io=socketIO.listen(server)

io.on('connection',(socket)=>{
    console.log('Nueva conexion',socket.id)

    socket.on('mensaje-cliente',(data)=>{
        io.emit('mensaje-servidor',data)
    })

    socket.on('usuario-escribiendo',(usuario)=>{
        //Emitir a todos excepto el que envia
        socket.broadcast.emit('usuario-escribiendo',usuario)
    })
})




