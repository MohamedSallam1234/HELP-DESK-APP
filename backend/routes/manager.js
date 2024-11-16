const{Router} = require('express');
const router = Router();
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const managerController = require("../controllers/managerController")


// generate report
router.post("/generatereport/:id",authorizationMiddleware([3]),managerController.generateReport)

// get specific report
router.get("/get-report/:id",authorizationMiddleware([3]),managerController.get_a_ticket_report);

// get all tickets
router.get("/alltickets",authorizationMiddleware([3]),managerController.Analytics)






module.exports = router;