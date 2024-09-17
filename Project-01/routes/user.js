const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleAddUser, 
} = require("../controllers/user");

const router = express.Router();

router.get("/").get(handleGetAllUsers).post(handleAddUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router;