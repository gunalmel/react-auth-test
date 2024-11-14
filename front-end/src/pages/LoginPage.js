import {useHistory} from 'react-router-dom';
import {useState, useEffect} from "react";
import {useToken} from "../auth/useToken";
import axios from "axios";
import {useQueryParams} from "../util/useQueryParams";

export const LoginPage = ()=>{
  const [, setToken] = useToken();

  const [errorMessage, emailError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [googleOAuthUrl, setGoogleOAuthUrl] = useState('');
  const {token: oauthToken} = useQueryParams();

  const history = useHistory();

  useEffect(()=>{
    if(oauthToken){
      setToken(oauthToken);
      history.push('/');
    }
  }, [oauthToken, setToken, history]);

  useEffect(()=>{
    const loadOAuthUrl = async ()=>{
      try {
        const response = await axios.get('/auth/google/url');
        const {url} = response.data;
        setGoogleOAuthUrl(url);
      } catch (error) {
        console.error('error loading google oauth url', error);
      }
    }
    loadOAuthUrl();
  },[]);

  const onLoginClicked = async ()=>{
    const response = await axios.post('/api/login', {email, password});
    const token = response.data.token;
    setToken(token);
    history.push('/');
  };

  return (
    <div className="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input onChange={e => setEmail(e.target.value)} placeholder="someone@gmail.com"/>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
      <button disabled={!email || !password} value={email} onClick={onLoginClicked}>Log In</button>
      <button onClick={()=> history.push('/forgot-password')}>Forgot your password?</button>
      <button onClick={()=> history.push('/signup')}>Don't have an account? Sing Up</button>
      <button disabled={!googleOAuthUrl} onClick={()=>{window.location.href=googleOAuthUrl}}>Login with Google</button>
    </div>
  )
}
