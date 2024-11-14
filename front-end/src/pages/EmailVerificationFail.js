import {useHistory} from 'react-router-dom';

export const EmailVerificationFail = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Email Verification Failed</h1>
      <p>Sorry, there was a problem verifying your email. Please try again.</p>
      <button onClick={() => history.push('/signup')}>Back to signup</button>
    </div>
  );
}
