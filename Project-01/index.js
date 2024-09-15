const express = require("express");
const users = require("./user_data.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Routes

app.get("/users", (req, res) => {
    const html = `
    <ul> 
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    // TODO : Edit the user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        res.json({status : "Failed to Edit the User Data"});
    }

    const updatedUser = {...users[userIndex], ...req.body};
    users[userIndex] = updatedUser;

    fs.writeFile("./user_data.json", JSON.stringify(users), (err, data) => {
        if(err){
            res.json({status : "Something went wrong"});
        } else{
            res.json({status : "User Detailed Updated Successfully", id : id});
        }
    })

}).delete((req, res) => {
    // TODO : Delete the user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return res.json({status : "Failed to Delete the user"});
    }

    users.splice(userIndex, 1);

    fs.writeFile("./user_data.json", JSON.stringify(users), (err, data) => {
        if(err){
            return res.json({status : "Something went wrong"});
        } else{
            return res.json({status : "User Deleted Successfully", id : id});
        }
    });
});

//REST API
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body});
    fs.writeFile("./user_data.json", JSON.stringify(users), (err, data) => {
        if(err){
            return res.json({status : "something went wrong"});
        }
        else{
            return res.json({status : "new user created"});
        }
    });
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