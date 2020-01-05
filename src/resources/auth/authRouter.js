const authRouter = require('express').Router();

const authController = require('./authController');
const authSchema = require('./authSchema');
const authMiddleware = require('./authMiddleware');
const validate = require('../../utils/validate');

authRouter.post(
  '/signup',
  validate(authSchema.signUpSchema),
  authMiddleware.emailDoesExists,
  authMiddleware.signUpCheckPasswords,
  authController.signUp,
);
authRouter.post(
  '/login',
  validate(authSchema.loginSchema),
  authMiddleware.userEmailExists,
  authController.login,
);
authRouter.post(
  '/forgot_password',
  validate(authSchema.forgotPwdSchema),
  authMiddleware.userEmailExists,
  authController.forgotPassword,
);
authRouter.post(
  '/reset_password/:token',
  validate(authSchema.resetPwdSchema),
  authMiddleware.validateResetToken,
  authMiddleware.resetCheckPassword,
  authController.resetPassword,
);
authRouter.get(
  '/confirm_user/:token',
  authMiddleware.checkConfirmToken,
  authController.confirmUser,
);
authRouter.get(
  '/resend_verify',
  authMiddleware.validateAuthToken,
  authMiddleware.userIsActive,
  authController.resendVerification,
);

module.exports = authRouter;