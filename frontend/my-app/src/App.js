import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import {Fragment} from 'react';

function App() {
  return (
    <Fragment className="App">
      <Cart/>
      <Header></Header>
      <main>
        <Meals></Meals>

      </main>

    </Fragment>
  );
}

export default App;
