const{Router} = require('express');
const userController = require('../controllers/userController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const router = Router();


// update user information
router.put("/updateinfo",userController.update)

// Access Knowledge base
router.get("/access" ,userController.Konwledge_base)//,authorizationMiddleware([1])

// send a ticket
router.post('/createticket',authorizationMiddleware([1]),userController.sendTicket);

// get automated sol.
router.get('/automatedsol',authorizationMiddleware([1]),userController.automated)

// rating of the ticket
router.put('/rating/:ticketid',authorizationMiddleware([1]),userController.rating)

  module.exports = router;