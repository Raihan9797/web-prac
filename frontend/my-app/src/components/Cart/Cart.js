import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

function Cart(props) {
    const cartCtx = useContext(CartContext);

    const hasItems = cartCtx.items.length > 0;
    const totalCartAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    function cartItemRemoveHandler(id) {
        console.log('removing')

    };

    function cartItemAddHandler(item) {
        console.log('adding')

    }
    const cartItems = <ul className = {classes['cart-items']}>
        {cartCtx.items.map(cartItem => 
        <CartItem 
         key={cartItem.id} 
         cartItemVal = {cartItem}
         onRemove = {cartItemRemoveHandler.bind(null, cartItem.id)}
         onAdd = {cartItemAddHandler.bind(null, cartItem)}
        >
    
        </CartItem>
        )}
    </ul>

    return (
        <Modal onHideModal={props.onHideCart}>
            {cartItems}
            <div className = {classes.total}>
                <span>Total Amount</span>
                <span>{totalCartAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;