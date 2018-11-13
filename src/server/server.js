const express = require('express');
const app = express();
const path = require('path');

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('dist'))

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
// }

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const SYS = 'SYSTEM'

io.on('connection', socket => {
    let name = ''

    socket.on('greet', username => {
        console.log(`${username} is connected`)

        name = username
        io.emit('greet', {
            name: SYS,
            content: `${username} is connected`
        })
    });

    socket.on('message', msg => {
        console.log(`Receive msg from ${msg.name}`)

        io.emit('message', {
            name: msg.name,
            content: msg.msg
        })
    });

    socket.on('disconnect', () => {
        console.log((`${name} leaved`))

        socket.broadcast.emit('leaved', {
            name: SYS,
            content: `${name} leaved`,
        })
    })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
