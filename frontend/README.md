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
