const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Donor = require('../models/donor.model');
const Patient = require('../models/patient.model');
const LoginActivityModel = require('../models/loginActivity.model');
const Joi = require('joi');
const sendMail = require('../utils/sendMail');
const { generateotp, fast2sms } = require('../utils/sendOTP');
const schema = require('../utils/validationSchema.js');
const { handleControllerError } = require('../middleware/response-handler');

module.exports = {
  generateOtp, verifyOTP, userDetails, updateProfile, logout, getLoginActivity
}

async function createUser(req) {
  if(req.body.user_type === 'patient') {
    return await Patient.create(req.body);
  } else if(req.body.user_type === 'donor') {
    return await Donor.create(req.body);
  } else {
    throw Error('Invalid user type: ' + req.body.user_type);
  }
}

async function generateOtp(req) {
  try {
    await Joi.validate(req.body, schema.loginOtpSchema, { abortEarly: true });
    const { mobile, user_type } = req.body;
  
    let user;
    if( user_type === 'patient') {
      user = await Patient.findOne({ mobile });
    } else {
      user = await Donor.findOne({ mobile });
    }
  
    if(!user) {
      user = await createUser(req);
    };
  
    const otp = generateotp(6); // generating otp
    user.mobileOtp = otp;
    user.mobileOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    console.log(user);
    await user.save();
  
    // await fast2sms(
    //   {
    //     message: `Your OTP is ${otp}`,
    //     contactNumber: user.mobile,
    //   },
    // );
  
    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function verifyOTP(req) {
  try {
    console.log(req.body);
    await Joi.validate(req.body, schema.verifyOtpSchema, { abortEarly: true });
    const { user_type, otp } = req.body;

    let user;
    if( user_type === 'patient') {
      user = await Patient.findOne({ mobile: req.body.mobile });
    } else {
      user = await Donor.findOne({ mobile: req.body.mobile });
    }

    console.log(user);

    if(!user) return false;

    let loginActivityDetails;

    if(user.mobileOtpExpire > Date.now() && user.mobileOtp === otp){
      console.log(user)
      loginActivityDetails = { user_id: user._id, user_type: user.user_type, body: req.body, status: 'success', };
      loginActivityDetails = await storeloginActivity(loginActivityDetails);
      user.mobileOtp = "";
      user.mobileOtpExpire = "";
      await user.save();
      token = await generateToken(user.toAuthJSON());
      
      return { user, token };
    } else
    {
      loginActivityDetails = { user_id: user._id, user_type: user.user_type, body: req.body, status: 'failed', };
      loginActivityDetails = await storeloginActivity(loginActivityDetails);

      return false;
    }
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function generateToken(user) {
  return jwt.sign({user}, config.jwtSecret, { expiresIn: config.jwtExpire });
}

async function storeloginActivity(req) {
  const { user_id, user_type } = req;
  const { agent, ip, latitude, longitude } = req.body;
  const login_status = req.status;
  const details = { user_id, user_type, agent, ip, latitude, longitude, login_status }
  const act = await new LoginActivityModel(details).save();
  console.log(act);
}

async function userDetails(req) {
  try {
   if(req.user.user_type === 'donor') {
    return await Donor.findById(req.user.id);
   } else if(req.user.user_type === 'patient') {
    return await Patient.findById(req.user.id);
   }
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function updateProfile(req) {
  try {
   if(req.user.user_type === 'donor') {
    return updateDonorProfile(req);
   } else if(req.user.user_type === 'patient') {
    return updatePatientProfile(req);
   }
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function updateDonorProfile(req) {
  try {
    
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function updatePatientProfile(req) {
  try {
    
  } catch (e) {
    throw handleControllerError(e);
  }
}

// Logout API Function
async function logout(req) {
  if(req.user)
  {
    const query = {user: req.user._id, login_status: "success"};

    let loggedIn = await LoginActivityModel.findOne(query).sort({_id:-1}).limit(1);
    
    loggedIn.logout_time = new Date;
    await loggedIn.save();
    
    return true;
  } else
    return false;
}

async function getLoginActivity(req) {
  try {
    return await LoginActivityModel.find({user_id: req.user.id || req.user._id}).sort({created_at: -1});
  } catch (e) {
    throw handleControllerError(e);
  }
}