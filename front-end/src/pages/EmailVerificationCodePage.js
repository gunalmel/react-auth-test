import {useQueryParams} from "../util/useQueryParams";
import {EmailVerificationSuccess} from "./EmailVerificationSuccess";
import {EmailVerificationFail} from "./EmailVerificationFail";
import {useToken} from "../auth/useToken";
import {useState} from "react";
import axios from "axios";


export const EmailVerificationCodePage = ()=>{
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [verificationString, setVerificationString] = useState('');
  const {email} = useQueryParams();
  const [,setToken] = useToken();

  const onSubmitVerificationString = async ()=>{
    try {
      console.log('hi');
      const response = await axios.put('/api/verify-email', {email, verificationString});
      const {token} = response.data;
      setToken(token);
      setIsSuccess(true);
    }catch (e){
      console.log(e);
      setIsFailure(true);
    }
  }

  if (isSuccess) return <EmailVerificationSuccess/>;
  if(isFailure) return <EmailVerificationFail/>;

  return (
    <div className="content-container">
      <h1>Please Verify your email</h1>
      <input value={verificationString} onChange={e => setVerificationString(e.target.value)} placeholder="123456"/>
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>
  );
}
