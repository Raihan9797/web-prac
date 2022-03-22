import React from 'react'
import CartContext from './cart-context';

// manage and provide the cart context to all components that need cart context data
export default function CartProvider(props) {
    function addItemToCartHandler(item) {

    };
    function removeItemFromCartHandler(id) {

    };
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
};
