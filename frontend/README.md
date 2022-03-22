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
