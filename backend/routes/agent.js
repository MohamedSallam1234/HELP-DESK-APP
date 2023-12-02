const agentModel = require("../models/agentModel")
const{Router} = require('express');
const agentController = require('../controllers/agentController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const router = Router();

// create an automated solution
router.post("/createsol",authorizationMiddleware([4]),agentController.createsol)