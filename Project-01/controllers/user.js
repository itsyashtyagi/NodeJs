const User = require("../models/user");

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.status(200).json(allDbUsers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ status : "user not found"});
    return res.status(200).json(user);
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, { lastName : "Changed"});
    return res.status(204).json({ status : "Success"});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({ status : "Success" });
}

async function handleAddUser(req, res){
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
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById, 
    handleDeleteUserById,
    handleAddUser,    
}