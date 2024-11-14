import {testRoute} from './testRoute';
import {signUpRoute} from "./signUpRoute";
import {loginRoute} from "./loginRoute";
import {updateUserInfoRoute} from "./updateUserInfoRoute";
import {testEmailRoute} from "./testEmailRoute";
import {verifyEmailRoute} from "./verifyEmailRoute";
import {forgotPasswordRoute} from "./forgotPasswordRoute";
import {resetPasswordRoute} from "./resetPasswordRoute";
import {getGoogleOAuthUrlRoute} from "./getGoogleOAuthUrlRoute";
import {googleOAuthCallbackRoute} from "./googleOAuthCallbackRoute";

export const routes = [
  signUpRoute,
  testRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOAuthUrlRoute,
  googleOAuthCallbackRoute,
  testEmailRoute
];
