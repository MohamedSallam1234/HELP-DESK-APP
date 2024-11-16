const{Router} = require('express');
const userController = require('../controllers/userController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const router = Router();


// update user information
router.put("/updateinfo",userController.update)

// Access Knowledge base`
router.post("/access",authorizationMiddleware([1]) ,userController.Konwledge_base)

// send a ticket
router.post('/createticket',authorizationMiddleware([1]),userController.sendTicket);

// get automated sol.
router.get('/automatedsol/:subCategory',authorizationMiddleware([1]),userController.automated)

// rating of the ticket
router.put('/rating/:ticketid',authorizationMiddleware([1]),userController.rating)

// get all tickets
router.get('/tickets-view',authorizationMiddleware([1]),userController.gettickets)

  module.exports = router;
