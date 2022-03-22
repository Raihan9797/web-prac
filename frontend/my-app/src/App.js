import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import {Fragment, useState} from 'react';

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

export default App;
