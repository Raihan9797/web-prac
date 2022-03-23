import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import {Fragment} from "react";

function Meals(props) {
    return <Fragment>
        <MealsSummary/>
        <AvailableMeals/>
    </Fragment>
};

export default Meals;