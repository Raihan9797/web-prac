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
