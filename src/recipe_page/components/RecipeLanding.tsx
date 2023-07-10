import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import RecipeInstance from "./RecipeInstance";
import { Link } from "react-router-dom";
import "../style/RecipeLandingStyle.css"
import { fontSize } from "@mui/system";



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
    // const api_url = "http://testingreactdeployment.uc.r.appspot.com";

    const front_url = "http://localhost:3000";
    // FOR LOCAL USE
    // UNCOMMENT THE LINE BELOW TO RUN LOCALLY
    // const front_url = "dietriot.me";
    

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
        <section className = "recipe-section-rec">
            <h1 style = {{fontFamily: "Georgia", 
            fontSize: "30px", 
            paddingTop:"30px", 
            paddingBottom: "30px"}}>{recipe.title}</h1>
            <div>{recipe.image !== null && <img src={recipe.image} alt="recipe" 
            style = {{width: "50%", 
            marginBottom: "30px",
            fontSize:"40px"}}></img>}</div>
        
            <div className = "recipe-info-rec">
                <p><span style={{ fontWeight: 'bold' }}>Calories:</span> {recipe.calories}</p>
                <p><span style={{ fontWeight: 'bold' }}>Name: </span>{recipe.title}</p>
                <p><span style={{ fontWeight: 'bold' }}>Link to recipe:</span> {recipe.recipeLink}</p>
                <p><span style={{ fontWeight: 'bold' }}>Serving(s):</span> {recipe.servings}</p>
                <p><span style={{ fontWeight: 'bold' }}>Recipe ID:</span> {recipe.id}</p>
            </div>
        </section>

        <section className = "diet-section-rec">
            <h3 style = {{fontFamily:"Verdana"}}>Diet Groups that Can Use It</h3>
            {recipe.dietgroups.map(function(dg) {
                return (
                <div>
                <Link to={front_url + "/dietgroups/view/" + dg.id} className = "contents-rec">{dg.title}</Link>
                </div>
                )
                })}
            <br></br>
        </section>

        <section className = "ings-section-rec">
            <h3 style = {{fontFamily:"Verdana"}}>Ingredients Used</h3>
                {recipe.ingredients.map(function(i) {
                    return (
                    <div>
                        <Link to={front_url + "3000/ingredients/view/" + i.id} className = "contents-rec">{i.title}</Link>
                    </div>
                    )
                })}
        </section>
    </div>
    );
}

export default RecipeLanding;

