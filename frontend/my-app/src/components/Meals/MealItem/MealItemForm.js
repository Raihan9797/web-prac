import {useRef, useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    const [amountIsValid, setAmountIsValid ] = useState(true);
    const amountInputRef = useRef();

    function submitHandler(event) {
        // prevent default refresh
        event.preventDefault();
        // always a string so need to convert
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        // we need more than just the amount to add to the cart
        console.log(enteredAmountNumber);
        props.onAddToCart(enteredAmountNumber);

    };
    return <form className = {classes.form} onSubmit={submitHandler}>
        <Input 
         ref = {amountInputRef}
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
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>

};

export default MealItemForm;