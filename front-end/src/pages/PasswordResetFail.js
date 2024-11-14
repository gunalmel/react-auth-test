import {useHistory} from 'react-router-dom';

export const PasswordResetFail = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Password Reset Failed</h1>
      <p>Sorry, there was a problem reset your password.</p>
      <button onClick={() => history.push('/login')}>Login</button>
    </div>
  );
}
