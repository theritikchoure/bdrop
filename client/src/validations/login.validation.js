import { isEmpty } from "../helper/common";

export const loginValidate = (payload) => {
    console.log(payload);
    let errors = {};

    if(isEmpty(payload.mobile) || String(payload.mobile).length !== 10) {
        errors.mobile = 'Mobile number must be at least 10 characters';
    }

    if(payload?.otp && isEmpty(payload.otp) /* || !isValidPassword(payload.password)*/) {
        errors.otp = 'OTP is required';
    }  

    return errors;
}