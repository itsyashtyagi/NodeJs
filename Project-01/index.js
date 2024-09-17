const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Connection 
mongoose
  .connect("mongodb://127.0.0.1:27017/project-one")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName :{
        type : String, 
        required : true, 
    }, 
    lastName : {
        type : String, 
    }, 
    email :{
        type : String, 
        required : true, 
        unique : true, 
    }, 
    jobTitle : {
        type : String, 
    }, 
    gender :{
        type : String, 
    }, 
}, 
{timestamps : true}
)

const User = mongoose.model('user', userSchema);

// Middleware - Plugin
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) => {
        next();
    });
});

app.use((req, res, next) => {
    next();
})

// Routes

app.get("/users", async (req, res) => {
    const allDbusers = await User.find({});
    const html = `
    <ul> 
      ${allDbusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.status(200).send(html);
});

app.route("/api/users/:id").get( async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ status : "user not found"});
    return res.status(200).json(user);
}).patch( async (req, res) => {
    // TODO : Edit the user with id
    await User.findByIdAndUpdate(req.params.id, { lastName : "Changed"});
    return res.status(204).json({ status : "Success"});

}).delete( async (req, res) => {
    // TODO : Delete the user with id
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({ status : "Success" });
});

//REST API
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Yash Tyagi"); // Custom Headers
    // Always add X to custom headers
    return res.status(200).json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.email){
        return res.status(400).json({status : "Bad Request somefields are missing"});
    }
    
    const result = await User.create({
        firstName : body.first_name, 
        lastName : body.last_name, 
        email : body.email, 
        gender : body.gender, 
        jobTitle : body.job_title, 
    });

    return res.status(201).json({status : "Success"});
});

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// app.patch("api/users/:id", (req, res) => {
//     // TODO : Edit the user with id
//     return res.json({status : "pending"});
// });

// app.delete("api/users/:id", (req, res) => {
//     // TODO : Delete the user with id
//     return res.json({status : "pending"});
// });


app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));