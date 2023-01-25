import '../../assets/styles/join.css';
import mobileSecurityIcon from '../../assets/images/mobile-security-icon.png';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { loginValidate } from '../../validations/login.validation';

function Join() {

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [buttonText, setButtonText] = useState('Request OTP');
  const [initialValue, setInitialValue] = useState({
    user: 'patient',
    mobile: '',
    otp: '',
  })
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = loginValidate({user: initialValue.user, mobile: initialValue.mobile})
    if(error) {
        console.log(error);
        setError(error);
        return;
    }

    setError({});
    
  }

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
                        <button className={initialValue.user === 'patient' ? 'tablinks active' : 'tablinks'}
                        onClick={() => onChangeFormData('user', 'patient')}>Patient</button>
                        <button className={initialValue.user === 'donor' ? 'tablinks active' : 'tablinks'}
                        onClick={() => onChangeFormData('user', 'donor')}>Donor</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login_mobile" className='login_mobile_label'>Enter mobile number login</label>
                        <input type='text' id="login_mobile"
                            value={initialValue.mobile}
                            onChange={(e) => onChangeFormData('mobile', e.target.value)}
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
                            isDisabled={true}
                        />

                        <button type='submit' id='login_submit_button'>Join - BDROP </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Join;