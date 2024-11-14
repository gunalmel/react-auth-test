import {useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {PasswordResetSuccess} from './PasswordResetSuccess';
import {PasswordResetFail} from "./PasswordResetFail";

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const {passwordResetCode} = useParams();

  const onResetClicked = async()=>{
    try {
      await axios.post(`/api/reset-password/${passwordResetCode}`, { newPassword: passwordValue });
      setIsSuccess(true);
    }catch(error){
      setIsFailure(true);
    }
  };

  if(isFailure) {
    return <PasswordResetFail />;
  }
  if(isSuccess) {
    return <PasswordResetSuccess />;
  }

  return(
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        placeholder="Password"/>
      <input
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        type="password"
        placeholder="Confirm Password"/>
      <button disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue} onClick={onResetClicked}>Reset Password</button>
    </div>
  );
}
