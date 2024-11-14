import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import {PrivateRoute} from "./auth/PrivateRoute";
import {PleaseVerifyEmailPage} from "./pages/PleaseVerifyEmailPage";
import {EmailVerificationLandingPage} from "./pages/EmailVerificationLandingPage";
import {PasswordResetLandingPage} from "./pages/PasswordResetLandingPage";
import {EmailVerificationCodePage}  from "./pages/EmailVerificationCodePage";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
              <Route path={`/verify-email`} exact>
                <EmailVerificationCodePage />
              </Route>
              <Route path="/forgot-password" exact>
                <EmailVerificationLandingPage/>
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/reset-password/:passwordResetCode" exact>
                <PasswordResetLandingPage />
              </Route>
              <Route path="/please-verify" exact>
                <PleaseVerifyEmailPage />
              </Route>
              <Route path="/signup" exact>
                <SignupPage />
              </Route>
            </Switch>
        </Router>
    );
}
