
import CartIcon from './CartIcon';
import './HeaderCartButton.css';

// first span for icon
// 2nd for text
// 3rd for badge of numItems

function HeaderCartButton(props) {
    return <button className='button'>

        <span className='icon'>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className='badge'> 3</span>

    </button>

};

export default HeaderCartButton;