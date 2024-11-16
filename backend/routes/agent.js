const agentModel = require("../models/agentModel")
const{Router} = require('express');
const agentController = require('../controllers/agentController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const router = Router();

// create an automated solution
router.post("/createsol",authorizationMiddleware([4]),agentController.createsol)

// update and close tickets
router.put("/updateticket/:ticketid",authorizationMiddleware([4]),agentController.updatetickets)

//get tickets of the agent
router.get("/agenttickets",authorizationMiddleware([4]),agentController.showTickets)

// get specific ticket
router.get('/agentticket/:ticketid',authorizationMiddleware([4]),agentController.agentticket)

router.post(
    "/sendEmail",
    authorizationMiddleware([4]),
    agentController.sendEmail
);

module.exports = router;
