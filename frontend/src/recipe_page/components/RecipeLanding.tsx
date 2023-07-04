import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import RecipeInstance from "./RecipeInstance";
import { Link } from "react-router-dom";



function RecipeLanding() {
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        const my_url = window.location.href;
        var parts = my_url.split("/");
        var result = parts[parts.length - 1];
        const url_id = Number(result);
        console.log(url_id);
        setId(url_id);
      }, []);
    
    
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
    const api_url = "http://localhost:5000";
    

    const make_flask_call = () => {
        const recipe_url = api_url + "/recipes/" + id;
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

    useEffect(() => {
        make_flask_call();
      }, [id]);

    return (
    <div className="App">
        <div>{recipe.title}</div>
        <div>{recipe.image !== null && <img src={recipe.image} alt="recipe"></img>}</div>
        <p>calories: {recipe.calories}</p>
        <p>{recipe.title}</p>
        <p>{recipe.recipeLink}</p>
        <p>{recipe.servings}</p>
        <p>{recipe.id}</p>
        
        <h3>Dietgroups:  </h3>
        {recipe.dietgroups.map(function(dg) {
            return (
            <div>
            <Link to={"http://localhost:3000/dietgroups/view/" + dg.id}>{dg.title}</Link>
            </div>
            )
            })}
        <br></br>
        <h3>Ings:  </h3>
        {recipe.ingredients.map(function(i) {
            return (
                <div>
                 <Link to={"http://localhost:3000/ingredients/view/" + i.id}>{i.title}</Link>
                </div>
            )
            })}

    </div>
    );
}

export default RecipeLanding;

