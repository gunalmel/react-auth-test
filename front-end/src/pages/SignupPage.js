import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useToken} from '../auth/useToken';
import axios from "axios";

export const SignupPage = ()=>{
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();
  const onSignupClicked = async ()=>{
    const response = await axios.post('/api/signup', {email, password});
    const {token} = response.data;
    setToken(token);
    history.push(`/please-verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="content-container">
      <h1>Sign up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="someone@gmail.com"/>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
      <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="password"/>
      <button disabled={!email || !password || password !== confirmPassword} onClick={onSignupClicked}>Sign Up</button>
      <button onClick={()=>history.push('/login')}>Already have an account? Log in</button>
    </div>
  )
}
