const{Router} = require('express');
const adminstratorController = require('../controllers/administratorController')
const router = Router();
const authorizationMiddleware = require("../middleware/authorizationMiddleware")

// create users
router.post("/createusers",authorizationMiddleware([2]),adminstratorController.createusers);

// change user role
router.post("/changeRole",authorizationMiddleware([2]),adminstratorController.changeUserRole);

// ada FAQs
router.post("/addFAQS",authorizationMiddleware([2]),adminstratorController.addFAQs);

module.exports = router;
