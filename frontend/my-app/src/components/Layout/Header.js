import {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpg';
import './Header.css'
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
    return <Fragment>
        <header className='header'>
            <h1>React Meals</h1>
            <HeaderCartButton onClick = {props.onShowCart}/>
        </header>
        <div className='main-image'>
            <img 
                src = {mealsImg}
                alt = "table of food"
            />
        </div>

    </Fragment>

};

export default Header;