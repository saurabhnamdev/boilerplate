const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createUser, getUser, getUserById } = require("../contollers/user");

router.post(
  "/",

  [
    check("firstName", "Please Enter a First Name").not().isEmpty(),
    check("lastName", "Please Enter a Last Name").not().isEmpty(),
    check("email", "Please Enter a valid Email").isEmail(),
    check("password", "Please Enter a valid Password").isLength({
      min: 8,
      max: 16,
    }),
    check("phone", "Please Enter a valid Phone").isLength({
      min: 10,
      max: 12,
    }),
  ],

  createUser
);
router.get("/", getUser);
router.get("/:id", getUserById);

module.exports = router;
