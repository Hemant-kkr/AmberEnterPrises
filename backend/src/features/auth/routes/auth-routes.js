import express from 'express';
const router = express.Router();
import signup from '../controllers/signup-controllers.js'
import verifyEmail from '../controllers/verifyEmail-controller.js'
import resendverification from '../controllers/resendVerification-controller.js';
import me from '../controllers/me-controller.js';
import login from '../controllers/login-controller.js';
import requireLogin from '../../../middlewares/requireLogin-middleware.js';
import signOut from '../controllers/signout-controller.js';

router.post('/signup',signup);
router.post('/login',login);
router.get('/verify/email',verifyEmail);
router.post('/resend/vmail',resendverification);
router.get('/get/user',me);
router.get('/signout',requireLogin,signOut);

export default router;