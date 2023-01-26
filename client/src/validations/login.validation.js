import { isEmpty } from "../helper/common";

export const loginValidate = (payload, otpValidate = false) => {
    console.log(payload);
    let errors = {};

    if(isEmpty(payload.mobile) || String(payload.mobile).length !== 10) {
        errors.mobile = 'Mobile number must be at least 10 characters';
    }

    if(otpValidate) {
        if(isEmpty(payload.otp)) {
            errors.otp = 'OTP is required';
        } else if(String(payload.otp).length !== 6) {
            errors.otp = 'OTP must be 6 digits';
        }
    }  

    return errors;
}