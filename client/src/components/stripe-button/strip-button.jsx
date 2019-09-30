import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({price}) => {
	const priceForStrip = price * 100;
	const publishableKey = 'pk_test_lnzM509MttIepfp30NOT36i100vRikOmz5';
	const onToken = token =>{
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStrip,
				token
			}
		}).then(respone => {
			alert('Payment succesful')
		}).catch(error => {
			console.log('payment error:', JSON.parse(error));
			alert('There was an issue with your payment. Please use the provided the credit card.')
		})
	};
	return(
		<StripeCheckout 
			label='Pay Now' // text inside the Stripe button
			name='Your Company Name'
			shippingAddress
			billingAddress
			image =''
			description={`Your total is $${price}`}
			amount={priceForStrip}
			panelLabel='Pay Now' 
			token= {onToken}
			stripeKey={ publishableKey }
		/>
	);
};

export default StripeCheckoutButton;