const express = require("express");
const router = express.Router();
const { createUser, getUser, getUserById } = require("../contollers/user");

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserById);

module.exports = router;
