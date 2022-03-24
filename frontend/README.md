# Front end notes
1. create react app
2. clear unecessary files

## 1. adding header component
1. Use Fragment: allows you to have more than one html element in the return
2. Can use css modules or regular css. They are interchangeable, but css modules are more scoped.
```js
import './Header.css'
```
3. Importing images via JSX. 
```js
import {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpg';
import './Header.css'

function Header(props) {
    return
        ...
        <div className='main-image'>
            <img 
                src = {mealsImg}
                alt = "table of food"
            />
        </div>
};
export default Header;
```
Allows you to import image like a variable. But you can just use urls if the image is online

3. index.css styles
Need to use box-sizing: border-box otherwise cart button wont appear for some reason
```css
* {
  box-sizing: border-box;
  border: solid red;
}

```

## 2. Import Header Cart Button Component
1. Basically styling the button have an icon, text and a number (that changes based on the amount of items selected). 
2. You can use SVG and create a component using the svg. See `CartIcon.js`. 
- Go to https://fontawesome.com/ to find your icons
- copy SVG code and put that in the return of the component


## 3. Adding a Meals (Products) Component
1. Meals will be the main thing. It displays a Summary telling us what is being sold. And the AvailableMeals which is the list of products available
2. Meals summary is quite basic as we dont need to show anything dynamic. Just a header with text and paragraphs
3. AvailableMeals recall for loop
```js
function AvailableMeals(props) {
    const mealsList = DUMMY_MEALS.map(meal => 
        <li>{meal.name}</li>
    );
        
    return <section className={classes.meals}>
        <ul>
            {mealsList}
        </ul>
    </section>

};

```
- From a dictionary of meals, we render each one using map. 


## 4. Adding Card Component and MealItem Component
1. Since the card component will usually contain data to be stored within it, we have to use `props.children`
```js
import classes from './Card.module.css';

function Card(props) {
    return <div className = {classes.card}>{props.children}</div>
};

export default Card;
```

2. Styles: normal css vs module.css
- module.css provdies scoping to prevent mixed results when you have classes with the same name. However, it is not required. But here's the main diff
```js
// import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import './AvailableMeals.css';

...
function AvailableMeals(props) {
    const mealsList = DUMMY_MEALS.map(meal => 
        <li>{meal.name}</li>
    );
        
    // return <section className={classes.meals}> // module.css version
    // normal css version below
    return <section className='meals'> 
      <Card>
        <ul>
            {mealsList}
        </ul>
      </Card>
    </section>

};
```

3. passing props from parent to child.
We create a meal item component to display the name, description and price of the meal. This means that from the AvailableMeals.js where we stored our hardcoded data of meals, we have to pass each meal to our mealItem.
* As shown previously, we separate each meal item using the map()
* Then its just a matter of passing the prop names.
* Make sure the name indicated in the parent file matches th names in the children. It can be any name, but they must match.
```js
// Available Meals
import MealItem from './MealItem/MealItem';
function AvailableMeals(props) {
    const mealsList = DUMMY_MEALS.map(meal => 
      <MealItem
      // meal = {meal}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
```

```js
function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`;
    return (<li>
        <div className = 'meal'>
            <h3>{props.name}</h3>
            <div className='description'>{props.description}</div>
            <div className='price'>{price}</div>
        </div>

        <div>
        </div>
    </li>)
};
```

* we can also just pass the meal as a whole as seen in the commented code. Then in the MealItem(), we access it via `props.meal.name`

## 5. Add MealItemForm and Input component
1. Besides the description of each mealitem, we want to be able to increase the qty selected for each one. We will create a separate MealItemForm component to be used in MealItem
```js
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    return <form className = {classes.form}>
        <Input 
         label = "Amount"
         input = {{
            id: 'amount_' + props.id,
            type: 'number',
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 2
         }}
        />
        <button>+ Add</button>
    </form>

};
```
2. Notice that we have also included an `id` for each input, this will allow each meal item to have their own specific qty input

3. You can see that we have created our own Input component as there is the possibility of reusing this component in other iterations. To make this component flexible, we use props to take in the usual arguments that a regular `input` component should be able to do. This allows us to throw all the input above into this component below.
- Notice that we use the spread operator `...`. This basically allows us to get all the key val pairs in the dict, even if we don't know the amount of values in the dict!
```js
// spread all the props from the parent component into the input
// eg when you use type = 'number' you can add the other params eg max, min
function Input(props) {
    return <div className = {classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input}></input>
    </div>
};
```

## 5. Create cart component
This is a precursor to the cart modal component. You can actually put this component in the `Meals.js` to see what it looks like. The idea is for this popup cart to appear when you click on the cart button

1. Recall module.css issues: renaming of certain classnames. Observe how the `cart-items` needs to have a dash. Using regular css, you can just put it in a string format which allows for spaces.
```js
function Cart(props) {
    const cartItems = <ul className = {classes['cart-items']}>
        {[
            {id:'c1', name:'Sushi', price:22.99},
        ].map(cartItem => <li>{cartItem.name}</li>)}
    </ul>
    ...
};
```

## 6. Adding Modal Via React Portal
1. React Portal for both backdrop (thing behind the modal overlay which blocks interaction with the rest of the page) and the modal overaly (to use it wherever you want but render the actual html element in a specific place in the dom tree)
    1. go to `index.html` file in `public` folder and add an 'overlay'
    ```html
    ...
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="overlays"></div>
    <div id="root"></div>
    ```
2. The main idea of the backdrop is that it sets the original page to be black and uninteractable (as we are focusing on the overlay)

3. The modal overlay is basically the popup that you will be rendering.
4. Both of these will rendered on a new "page" called `overlay` basically to prevent really wonky stuff from happening.


## Managing Cart and Modal State
1. Managing State of Cart (visible, not visible) so we need to use `useState`. We add that in the `App.js` file, because thats where we are rendering the Cart element!
```js
  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }
  function hideCartHandler() {
    setCartIsShown(false);
  }
```

2. To make the cart overlay disappear depending on the state, you can use the conditional and quickly.
```js
  return (
    <Fragment className="App">
      {cartIsShown && <Cart/>}
      ...
    </Fragment>
  );
}
```

3. Now we need to create and link function that can show or hide the cart overlay. Recall 2 way binding. Basically on the component that renders the Cart (ie App.js) we have a function that changes the state of the Cart ie a `showCartHandler()` and `hideCartHandler()`. We want its children to be able to access this function eg. When we click the backdrop, it should hide the Cart ie call hideCartHandler(), so we pass them through via props
- Context can be used here actually. but as they discussed, it makes things to general eg. clicking on the backdrop will also cause multiple other calls to other components that are tied to the context
```js
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler() {
    console.log('show cart');
    setCartIsShown(true);
  }
  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals></Meals>

      </main>

    </Fragment>
  );
}
```
- As you can see, both show and hidecart is in this App.js. We set a name `onHideCart = {hideCartHandler}` that will be passed down to Cart to point to the `hideCartHandler` function.
```js
// Cart.js
function Cart(props) {
    const cartItems = <ul className = {classes['cart-items']}>
        {[
            {id:'c1', name:'Sushi', price:22.99},
        ].map(cartItem => <li>{cartItem.name}</li>)}
    </ul>

    return (
        <Modal onHideModal={props.onHideCart}>
            {cartItems}
            <div className = {classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
};
```
* Observe how there are 2 `{props.onHideCart}` in this component. Basically, there are 2 instances that will result in hiding the Cart overlay: clicking on the backdrop or clicking on the `Close` button in the cart overlay!

```js
function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClick}></div>
};

...
function Modal(props) {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick ={props.onHideModal}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
         portalElement)}
    </Fragment>

};

```
* finally, we can see that the function is drilled all the way down to the Backdrop component.


## 6. Adding Cart Context
We need to use Context to add items to Cart. This is because we need it in multiple places in the application. On MealItems, we need to update the Cart, on the Cart we need to output the products. Also need to manage it in the future where we can add and remove.

1. Create a `store` folder beside `assets` and `components`. this is the standard name
2. Create a `cart-context.js` in the store. Can be any name tbh
3. To manage, we need useState or useReducer. We will create a separate component to manage the context called `CartProvider.js`
4. CartProvider will wrap components that need access to the Cart ie App.js. So instead of using the Fragment in `App.js` use `<CartProvider>`
    - Cart needs to render cart items
    - Header needs to acess the badge in the header
    - Meals need access since we want to add items to the Cart

## 7. Using Context
Now that we've setup the Context, we begin to use them. Let's start with the amount to be shown in the cart button. So we `useContext`

1. import `useContext` and `CartContext`. This allows us to set the context in the `HeaderCartButton`. It's basically like setting a state. Once that cart context changes, this component will reload.

2. For this component, we want to display the amount of items in the cart. Hence we use the reduce function as discussed in the comments below.

3. Finally that variable is displayed in the component
```js
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
```


## 8. Adding Cart Reducer
To add cart items, we need to go to `CartProvider`. This is where we settle the changes
1. We can useState, but useReducer is preferred for more complex functions. They are kinda similar, where we can useReducer and it returns a `state` that we will change to refresh the components and `dispactAction` which is basically setting the state.
- To do this, we need a default value `defaultCartState` and a reducer function to manage the state of the cart

```js
    // we point at the function and then the default value ie initial state
    // it returns an array with the state and the dispatch function
    // now cartState is the state we will be changing and dispatch is the function we will be using to change the state
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

```
2. The reducer function will take in the dispatch function and handler the state of the Cart

```js
// created outsider cos it doesnt need to be reloaded every time the cart changes
/*
action is dispatched from the cart-context.js by you
we need to return a new state
*/
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = state.items.concat(action.item); // returns a new array ie immutable
        console.log(updatedItems);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
    return defaultCartState;
};

```

2. Just like useState, we will have Handlers to change the state of the Cart. However this time, we will use the dispatcher to tell the reducer what type of action needs to be done.

3. We also set the context inside the component and basically tell the component what functions we will be using

```js
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

    };
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

```


## 9. Working with Refs and Forward Refs
1. Now that we have set up the functions to change the Cart STate, we need to link the functions to the components that will call it. We will 
Refs are basically states that will NOT re-render the component.

## 10. Outputtng Cart Items
We want to display the items that we have added in the cart on the Cart Popup.
1. Use the CartContext in the Cart.js

2. Replace the outputs with the CartContext items
- Recall the for a list item, make sure that it has a key when we are doing the mapping
- When cart has items, then show the 'Order' Button. Use a value to check the length of the cart context items. Will need to use state in the future when we remove items!
- For the functions to add or remove in the cart overlay, use bind to only link the specific elements that you need. Preconfigures for future execution.
```js
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

```

3. Create a CartItem to display each item

4. To prevent too many items from not being seen. Make the cart scrollable:
```css
.cart-items {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
}

```


## 11. More complex cart logic
we want to make sure that duplicate items are grouped together.


## 12. Making it multi page using React Router
1. import router
2. change index.js to include the browser router
3. app.js can use router to go to different pages. Each page is a separate js file
4. to go to different pages, we will need to use Nav Link to prevent refreshing everytime we go to a different page instead of LInk

## 13. Authenticating
1. start with initial files
2. Work on Auth form first. useState or useRef. When you submit, need to post the values to the backend.
```js
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  function emailChangeHandler(event) {
    console.log(event.target.value);
    setEnteredEmail(event.target.value);
  }

  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    ...
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={enteredEmail} onChange={emailChangeHandler}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required value={enteredPassword} onChange={passwordChangeHandler}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
```


- In the submit Event, this is where you post and use async to get the responses
```js
  async function submitHandler(event) {
    event.preventDefault();

    // optional: check email and password

    console.log(enteredEmail, enteredPassword);

    if (isLogin) {
      const response = await fetch('http://localhost:8080/login',
      {
        method: 'POST',
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);
      window.localStorage.setItem('token', data.token);
      const newtoken = window.localStorage.getItem('token');
      console.log('token stored', newtoken);

    } else {
      const response = await fetch('http://localhost:8080/register',
      {
        method: 'POST',
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // console.log('dfadfads', response.body.getReader());

      if (response.ok) {
        //const data = await response.body.getReader().read()
        // get the readable stream and convert it to string
        const data = await response.body.getReader().read().then(function(result) {
          return new TextDecoder("utf-8").decode(result.value);
        });
        // console.log('registed user response: ', data);
        alert(data);
      } else {
        // console.log('something went wrong');
        alert('Authentication Failed');
      }
    }
  };
```

## Managing Auth State with context
1. Setup `auth-context.js` in `store` folder
- Set what the context should have and its functions to change the context
```js
import React, {useState} from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

```

- Create a Provider component in the same file that is basically a wrapper to handle the context
- export the context and provider
```js
// named export
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token; // !! converts to boolean. if empty string, false. if anything else, true.

    function loginHandler(token) {
        setToken(token);
    };

    function logoutHandler() {
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    
    return (<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>);
};

export default AuthContext;

```

2. Set the location of the ContextProvider
- Firstly, find where the contextprovider should be in. Since we need to check the authentication for the entire application, wrap the provider at `index.js`
```js
...
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);

```

3. Go to files which change or need the context
- eg. AuthForm.js is where we set the authContext, once a user is logged in we need to store the token and tell other sites that this user is logged in

```js
import { useState, useContext} from 'react';
import AuthContext from '../../store/auth-context';
...

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  ...

  async function submitHandler(event) {
    event.preventDefault();

    // optional: check email and password

    console.log(enteredEmail, enteredPassword);

    if (isLogin) {
        // post response to db and get the data
      const response = await fetch('http://localhost:8080/login',
      const data = await response.json();
      window.localStorage.setItem('token', data.token);
      const newtoken = window.localStorage.getItem('token');
      console.log('token stored', newtoken);

      // STORE THE TOKEN; CHANGE THE AUTHCONTEXT! ///////////////////////////////////
      authCtx.login(data.token);

    } else { // register user
    ...
    }
    ...

  };

};

```


4. Now that we have set the user to isLoggedIn, we need to spread this message around.
- eg. Only when a user is logged in should he be able to see his profile. He should also not be asked to login again. So we go to the main navigation and render the links conditionally based on the isLoggedIn context