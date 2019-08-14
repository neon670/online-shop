import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item'

import './cart.scss';

const Cart = ({cartItems}) => (
	<div className='cart-dropdown'>
		<div className='cart-item'>
			{cartItems.map(cartItem =>(
				<CartItem key={cartItem.id} item={cartItem} />
				))}
		</div>
		<CustomButton>GO TO CHECKOUT </CustomButton>
	</div>
)
const mapStateToProps = ({cart:{cartItems}}) => ({
	cartItems
});

export default connect(mapStateToProps)(Cart);