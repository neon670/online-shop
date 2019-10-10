import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import { } from './sign-in-sign-up.styles';

const SignInSignUp = () => (
	<SignInAndSignUpContainer>
    <SignIn/>
    <SignUp/>
  </SignInAndSignUpContainer>
)
export default SignInSignUp;