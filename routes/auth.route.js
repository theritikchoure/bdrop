const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();
const {resMsg} = require('../config/constant');
const { createError, createResponse } = require('../middleware/response-handler');
module.exports = router;

// ------------------ Auth Related Routes (Start) ------------------
router.post('/generateotp', asyncHandler(generateOTP)); // Done
router.post('/verifyotp', asyncHandler(verifyOTP)); // Done
router.get("/user-details",passport.authenticate("jwt", { session: false }), asyncHandler(userDetails));
router.post('/logout', passport.authenticate('jwt', { session: false }), asyncHandler(logout)); 

// router.get('/updateprofile', passport.authenticate('jwt', { session: false }), updateProfile);
// ------------------ Auth Related Routes (End) ------------------


// Route for Generate OTP for Login
async function generateOTP(req, res, next) {
  try{
    let generateOtp = await authCtrl.generateOtp(req);
    if(!generateOtp) return createError(res, 400, "try again");
    return createResponse(res,201,resMsg.OTP, generateOtp);
  }catch(e){
    return createError(res, 400, e);
  }
}


// Route for verify OTP for Login
async function verifyOTP(req, res, next) {
  try{

    // Details for LoginActivity
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    let agent = req.headers['user-agent'];
  
    if(!ip && !agent){ return customResponse(res,400, resMsg.NO_DATA_FOUND, null); }
  
    req.body.agent = agent;
    req.body.ip = ip;

    let isOtpVerified = await authCtrl.verifyOTP(req);
    if(!isOtpVerified) return createError(res, 400, resMsg.LOGIN_FAILED);
    return createResponse(res,200, resMsg.LOGIN, isOtpVerified);
  }catch(e){
    return createError(res, 400, e);
  }
}

async function userDetails(req, res, next) {
  try {
    let response = await authCtrl.userDetails(req);
    if (response) return createResponse(res, 200, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, 400, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, 400, e);
  }
}

async function logout(req, res, next) {
  try {
    let response = await authCtrl.logout(req);
    if (response) return createResponse(res, 200, resMsg.LOGOUT, response);
    else
      return createError(res, 400, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, 400, e);
  }
}