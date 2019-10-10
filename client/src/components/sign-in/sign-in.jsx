import React, { useState }from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import { SignInContainer, SignInTitle, ButtonsBarContainer } from './sign-in.styles';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
	const [userCredentials, setUserCredentials] = useState({email:'', password:''})
	
	const { email, password } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		

		emailSignInStart(email, password);
		// try{
		// 	await auth.signInWithEmailAndPassword(email, password);
		// }catch(error){

		// }
		// this.setState({ email: '', password:''});
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setUserCredentials({...userCredentials,[name]: value})
	}
	
		
		return(
			<SignInContainer>
			<SignInTitle>I already have an account</SignInTitle>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
			
				<FormInput name="email" type='email' value={email} 
				handleChange= { handleChange } label='email' required 
				/>
				
				<FormInput name="password" value={password} type='password'
				handleChange={ handleChange } label='password' required 
				/>
				
				<ButtonsBarContainer>
					<CustomButton type="submit">Sign In</CustomButton>
					<CustomButton type ='button' onClick={googleSignInStart} isGoogleSignIn>
						{' '}
						Sign in with Google{' '}
					</CustomButton>
				</ButtonsBarContainer>
			</form>
			</SignInContainer>
		);
	

}

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);