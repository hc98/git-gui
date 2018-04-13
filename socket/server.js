const http = require('http').createServer(handler)
const io = require('socket.io')(http);
const fs = require('fs')

http.listen(8080)

function handler(req, res){
    fs.readFile(__dirname + '/index.html', (err, data)=>{
        if (err) throw err;
        // res.send()
        res.end(data)
    })
}

io.on('connection', (socket)=>{
    socket.emit('news', {hello: 'world'})
    socket.on('my other event', (data)=>{
        console.log(data);
    })
})