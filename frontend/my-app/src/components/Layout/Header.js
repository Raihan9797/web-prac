import {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpg';
import './Header.css'

function Header(props) {
    return <Fragment>
        <header className='header'>
            <h1>React Meals</h1>
            <button>Cart</button>
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