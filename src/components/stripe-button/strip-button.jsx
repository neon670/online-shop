import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
	const priceForStrip = price * 100;
	const publishableKey = 'pk_test_lnzM509MttIepfp30NOT36i100vRikOmz5';
	const onToken = token =>{
		console.log(token);
		alert('payment success');
	}
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