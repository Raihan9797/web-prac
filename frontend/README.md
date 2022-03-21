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
