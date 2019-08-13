import React from 'react';
import CustomButton from '../custom-button/custom-button';

import './cart.scss';

const Cart = () => (
	<div className='cart-dropdown'>
		<div className='cart-item'>
		<CustomButton>GO TO CHECKOUT </CustomButton>
		</div>
	</div>
)

export default Cart;