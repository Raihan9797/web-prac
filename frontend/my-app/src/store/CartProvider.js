import React from 'react'
import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};


// created outsider cos it doesnt need to be reloaded every time the cart changes
/*
action is dispatched from the cart-context.js by you
we need to return a new state
*/
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = state.items.concat(action.payload); // returns a new array ie immutable
        console.log('action', action);
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
    return defaultCartState;
};

// manage and provide the cart context to all components that need cart context data
export default function CartProvider(props) {
    // we point at the function and then the default value ie initial state
    // it returns an array with the state and the dispatch function
    // now cartState is the state we will be changing and dispatch is the function we will be using to change the state
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    function addItemToCartHandler(item) {
        /*
        if item already in the cart, just increment the quantity
        else add the item to the cart
        */
       dispatchCartAction({
            // type to identify the action
            type: 'ADD_ITEM',
            // what im forwarding to the reducer
            payload: item
        });

    };
    function removeItemFromCartHandler(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            payload: id
        });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
};
