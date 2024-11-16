const{Router} = require('express');
const authController = require('../controllers/authController')
const router = Router();


//Register
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

router.post("/otp/login", authController.otpLogin);

router.post("/otp/verify", authController.otpVerify);



module.exports = router;
