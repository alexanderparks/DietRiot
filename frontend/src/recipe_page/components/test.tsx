import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import RecipeInstance from "./RecipeInstance";


function Test() {
    let initData: RecipeInstance = {
        calories: 0,
        id: 0,
        ingredients: [],
        dietgroups: [],
        title: "",
        recipeLink: "",
        image: "",
        servings: 0,
        };


    const [recipe, setRecipe] = React.useState<RecipeInstance>(initData);
    const [recipeID, setRecipeID] = useState(0);
    const api_url = "http://localhost:5000";
    useEffect(() => {
        make_flask_call();
    }, [recipeID]);

    const make_flask_call = () => {
        const recipe_url = api_url + "/recipes/" + recipeID;
        console.log(recipe_url);
        axios
            .get(recipe_url)
            .then(function (response) {
                // handle success
                let res = response.data[0];
                console.log(res);
                setRecipe({
                    calories: res.calories,
                    id: res.id,
                    ingredients:  res.ingredients,
                    dietgroups: res.dietgroups,
                    title: res.title,
                    recipeLink: res.recipeLink,
                    image: res.src,
                    servings: res.servings,
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    function getRecipe(id: any) {
    setRecipeID(id);
    }

    return (
    <div className="App">
        <div>{recipe.title}</div>
        <div>{recipe.image !== null && <img src={recipe.image} alt="recipe"></img>}</div>
        <p>{recipe.title}</p>
        <p>hello {recipeID}{}</p>
        <p>{recipeID}</p>
        <div>
        <button onClick={() => getRecipe(1)}>Elite Recipe</button>
        <button onClick={() => getRecipe(2)}>Mid Recipe</button>
        </div>
    </div>
    );
}

export default Test;

