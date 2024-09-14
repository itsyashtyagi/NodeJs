const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} New Request Recieved\n`
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("HomePage");
                break;
            case "/about": 
                res.end("I am yash tyagi");
                break;
            default :
                res.end("404 Not Found");    
        }
        // res.end("Hello From Server Again");
    });
    // console.log(req);
    // console.log("New Request Recieved");
    // res.end("Hello From Server");
});

myServer.listen(8000, () => {
    console.log("Server Started");
})