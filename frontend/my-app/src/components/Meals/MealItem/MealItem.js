import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import './MealItem.css';
import MealItemForm from './MealItemForm';

function MealItem(props) {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    function addToCartHandler(amount) {
        // add the items to the cart context
        // console.log(`props price: ${props.price}`)
        const newItem = {
            id: props.id,
            // key: props.id,
            name: props.name,
            // description: props.description, // dn the desc
            amount: amount,
            price: props.price
        };
        console.log(newItem);
        cartCtx.addItem(newItem);
    };



    return (<li className = 'meal'>
        <div>
            <h3>{props.name}</h3>
            <div className='description'>{props.description}</div>
            <div className='price'>{price}</div>
        </div>
        <div>
            <MealItemForm id = {props.id} onAddToCart = {addToCartHandler}/>
        </div>

    </li>)
};

export default MealItem;