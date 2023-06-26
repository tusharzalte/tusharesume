const router = require('express').Router();
const { captcha, screenshot, userLogin, userRegister, userUpdate } = require('../controller/userController');

router.get('/captcha', captcha);
router.get('/screenshot', screenshot);
router.post('/login', userLogin);
router.post('/register', userRegister);
router.put('/update', userUpdate);

module.exports = router;