const{Router} = require('express');
const userController = require('../controllers/userController')
const router = Router();


// update user information
router.put("/updateinfo",userController.update)


  module.exports = router;