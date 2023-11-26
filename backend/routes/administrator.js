const{Router} = require('express');
const userController = require('../controllers/administratorController')
const router = Router();
const authorizationMiddleware = require("../middleware/authorizationMiddleware")

// create users
router.post("/createusers",authorizationMiddleware([2]),userController.createusers)


  module.exports = router;