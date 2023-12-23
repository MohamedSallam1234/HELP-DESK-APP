const{Router} = require('express');
const router = Router();
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const managerController = require("../controllers/managerController")


// generate report
router.post("/generate/:id",authorizationMiddleware([2]),managerController.generate_report);

router.post("/get-report/:id",authorizationMiddleware([2]),managerController.generate_report);
module.exports = router;