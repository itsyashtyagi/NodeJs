const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleuserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }
  const token = setUser(user);
  // res.cookie("uuid", token);
  // return res.redirect("/");
  return res.json({ token });
}


module.exports = {
  handleuserSignUp,
  handleUserLogin,
};
