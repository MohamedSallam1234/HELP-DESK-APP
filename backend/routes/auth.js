const{Router} = require('express');
const authController = require('../controllers/authController')
const router = Router();


//Register
router.post('/register', authController.register);

//login 
router.post('/login', authController.login);



module.exports = router;