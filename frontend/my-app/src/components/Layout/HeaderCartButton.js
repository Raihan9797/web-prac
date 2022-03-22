import CartIcon from './CartIcon';
import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import './HeaderCartButton.css';

function HeaderCartButton(props) {
    // header will be reevaluated every time the cart changes due to the useContext hook
    // will be managed by the closest Provider in App.js
    const cartCtx = useContext(CartContext);

    // we dw to add every item as a new entry. eg. We have 1 sushi item, but we could buy 3 pieces of sushi.
    // const numOfCartItems = cartCtx.items.length; 

    // using reduce, we basically start from 0, the accumulator.
    // for each item, get the amount and add it to the accumulator
    const numberOfCartItems = cartCtx.items.reduce((acc, currItem) => 
    {return acc + currItem.amount;}
    , 0);


    return <button className='button' onClick={props.onClick}>

        <span className='icon'>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className='badge'>{numberOfCartItems}</span>

    </button>

};

export default HeaderCartButton;