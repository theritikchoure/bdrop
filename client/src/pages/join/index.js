import '../../assets/styles/join.css';
import mobileSecurityIcon from '../../assets/images/mobile-security-icon.png';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { loginValidate } from '../../validations/login.validation';
import { connect } from 'react-redux';
import { generateOTP, verifyOTP } from '../../services/auth.service';
import { isEmpty } from '../../helper/common';
import { successToast, warningToast } from '../../components/toasterNotifications';
import { useNavigate } from 'react-router-dom';

function Join(props) {

  const navigate = useNavigate();
  const [formType, setFormType] = useState('generateotp');
  const [otpDisabled, setOtpDisabled] = useState(true);
  const [buttonText, setButtonText] = useState('Request OTP');
  const [initialValue, setInitialValue] = useState({
    user_type: 'patient',
    mobile: '',
    otp: '',
  });
  const [error, setError] = useState({

  })

  const onChangeFormData = (key, value) => {
    if (!key) return;

    console.log(key, value)
    
    setInitialValue((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formType === 'generateotp') {
      generateOtp(e);
      return;
    } else if(formType === 'verifyotp') {
      verifyOtp(e);
      return;
    }

    return;
  }

  const generateOtp = async (e) => {
    try {
      let error = loginValidate({user_type: initialValue.user_type, mobile: initialValue.mobile})
      if(!isEmpty(error)) {
        console.log(error);
        setError(error);
        return;
      }

      setError({});

      let res = await props.generateOTP({user_type: initialValue.user_type, mobile: initialValue.mobile});
      setOtpDisabled(false);
      setInitialValue({
        user_type: initialValue.user_type,
        mobile: initialValue.mobile,
        otp: '',
      });
      setFormType('verifyotp');
      setButtonText('Submit OTP');
      successToast(res.message);
      return true;
    } catch (error) {
      console.log(error);
      warningToast(error.message || error);
    }
  };

  const verifyOtp = async (e) => {
    try {
      console.log('verify otp')
      let error = loginValidate({user_type: initialValue.user_type, mobile: initialValue.mobile, otp: initialValue.otp}, true);
      console.log(error);
      if(!isEmpty(error)) {
        setError(error);
        return;
      }

      setError({});

      let res = await props.verifyOTP({user_type: initialValue.user_type, mobile: initialValue.mobile, otp: initialValue.otp});
      setOtpDisabled(false);
      setInitialValue({
        user_type: 'patient',
        mobile: '',
        otp: '',
      });
      setFormType('generateotp');
      setButtonText('Request OTP')
      successToast(res.message);
      navigate('/');
      return true;
    } catch (error) {
      console.log(error);
      warningToast(error.message || error);
    }
  };

  return (
    <div className="join-container">
        <div className='join-container-row'>
            <div className='join-container-col left'>
                <div className="logo-container">
                    <img src={mobileSecurityIcon} alt=""/>
                </div>
                    <h3>Join - BDROP</h3>
            </div>
            <div className='join-container-col right'>
                <div className='login-form-container'>
                    <div className="tab">
                        <button className={initialValue.user_type === 'patient' ? 'tablinks active' : 'tablinks'}
                        onClick={() => onChangeFormData('user_type', 'patient')}>Patient</button>
                        <button className={initialValue.user_type === 'donor' ? 'tablinks active' : 'tablinks'}
                        onClick={() => onChangeFormData('user_type', 'donor')}>Donor</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login_mobile" className='login_mobile_label'>Enter mobile number login</label>
                        <input type='text' id="login_mobile"
                            value={initialValue.mobile}
                            onChange={(e) => onChangeFormData('mobile', e.target.value)}
                            disabled={formType === 'verifyotp'}
                        />
                        {error?.mobile && <span className='validation_message'>{error?.mobile}</span>}
                        <br />

                        <label htmlFor="login_otp" className='login_mobile_label'>Enter OTP</label>
                        <OtpInput id="login_otp"
                            value={initialValue.otp}
                            onChange={(otp) => {onChangeFormData('otp', otp)}}
                            numInputs={6}
                            separator={<span>-</span>}
                            containerStyle={'login_otp_container'}
                            inputStyle={'login_otp_input'}
                            isDisabled={formType === 'generateotp'}
                        />
                        {error?.otp && <span className='validation_message'>{error?.otp}</span>}

                        <button type='submit' id='login_submit_button'>{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { generateOTP, verifyOTP })(Join);