const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(8080);
}).listen('8080')