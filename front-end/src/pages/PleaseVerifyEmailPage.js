import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const PleaseVerifyEmailPage = ()=>{
  const history = useHistory();
  const {email} = useQueryParams();

  useEffect(()=>{
    setTimeout(()=>{
      history.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 3000);
  }, [history, email]);
  return (
    <div className="content-container">
      <h1>Please verify your email address</h1>
      <p>We sent you an email with a link to verify your email address. Please check your inbox and click on the link in the email to verify your email address.</p>
    </div>
  )
}
