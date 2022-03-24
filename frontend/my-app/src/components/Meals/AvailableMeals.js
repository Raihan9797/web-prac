import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
// import './AvailableMeals.css';
import MealItem from './MealItem/MealItem';
// import { useState } from 'react';


const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

function AvailableMeals(props) {
  /*
  const [products, setProducts] = useState(DUMMY_MEALS);
  async function fetchProducts() {
    const response = await fetch('http://localhost:8080/shopping/get_products');
    // console.log(response.status);
    const data = await response.json();

    const transformedProducts = data.map(product => {
      return {
        name: product.title,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
        image: product.image,
        qty: product.qty,
      };
    });
    // console.log(transformedProducts);
    setProducts(transformedProducts);
  };

  console.log('FETCHINGJJKJ');
  */

  const mealsList = DUMMY_MEALS.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );

  // return <section className='meals'>
  return <section className={classes.meals}>
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  </section>


};

export default AvailableMeals;