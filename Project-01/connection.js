const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectMongoDb(url){
    return mongoose.connection(url);
}

module.exports = {
    connectMongoDb,
}