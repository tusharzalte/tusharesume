const router = require('express').Router();
const { captcha, screenshot, userLogin, userRegister, userUpdate,userDetails } = require('../controller/userController');

router.get('/captcha', captcha);
router.get('/screenshot', screenshot);
router.post('/login', userLogin);
router.post('/register', userRegister);
router.put('/update', userUpdate);
router.get("/users", userDetails)
module.exports = router;