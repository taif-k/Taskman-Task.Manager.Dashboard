/*
    Purpose: Define the API endpoints.

    Routes map URLs to controller functions.
 */

const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;