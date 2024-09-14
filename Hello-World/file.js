const fs = require('fs');


// Sync..
// fs.writeFileSync('./test.txt', "Hello World");

// Async..
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

fs.appendFileSync("./contact.txt", `${Date.now()} Hey There \n`);

fs.cpSync('./test.txt', "./copy.txt");

fs.unlinkSync("./copy.txt");

const result = fs.statSync('./test.txt');
// console.log(result);

fs.mkdirSync("my-docs/a/b", {recursive : true});
