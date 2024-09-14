const fs = require('fs');
const os = require('os');

console.log(os.cpus().length);


// Sync.. Blocking Request
// fs.writeFileSync('./test.txt', "Hello World");

// Async.. Non Blocking request
// fs.writeFile('./test.txt', "Hello World Async", (err) => {});

// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync("./contact.txt", `${Date.now()} Hey There \n`);

// fs.cpSync('./test.txt', "./copy.txt");

// fs.unlinkSync("./copy.txt");

// const result = fs.statSync('./test.txt');
// console.log(result);

// fs.mkdirSync("my-docs/a/b", {recursive : true});

// Blocking request 

// console.log("1");

// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// console.log("2");
// console.log("3");

// Non Blocking Request

// console.log("1");

// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// })


// console.log("2");
// console.log("3");

// Default Thread Pool size = 4
// Maz? - 8core cpu - 8

// We should write a code that is non blocking

