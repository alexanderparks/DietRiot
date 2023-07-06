import axios from "axios";
import React from "react";
import { useState, useEffect, SetStateAction } from "react";
import IngredientInstance from "./IngredientInstance";
import { Link } from "react-router-dom";
import "../Style/IngredientStyle.css"


function IngredientLanding() {
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        const my_url = window.location.href;
        var parts = my_url.split("/");
        var result = parts[parts.length - 1];
        const url_id = Number(result);
        console.log(url_id);
        setId(url_id);
      }, []);
    
    
    let initData: IngredientInstance = {
        title: "",
        id: 0,
        aisle: "",
        sugars: 0.0,
        carbs: 0.0,
        protein: 0.0,
        calories: 0.0,
        serving: "",
        recipes: [],
        image: "",
        };


    const [ingredient, setIngredient] = React.useState<IngredientInstance>(initData);
    const [ingredientID, setIngredientID] = useState(1);
    const api_url = "http://localhost:5000";
    

    const make_flask_call = () => {
        const ing_url = api_url + "/ingredients/" + id;
        console.log(ing_url);
        axios
            .get(ing_url)
            .then(function (response) {
                // handle success
                let res = response.data[0];
                console.log(res);
                setIngredient({
                    title: res.title,
                    image: res.src,
                    id: res.id,
                    aisle: res.aisle,
                    sugars: res.sugars,
                    carbs: res.carbs,
                    protein: res.protein,
                    calories: res.calories,
                    serving: res.serving,
                    recipes: res.recipes,
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
    

    function getIngredient(id: any) {
    setIngredientID(id);
    }

    return (
    <div className="App">
        <section className = "ing-section">
            <h1 style = {{fontFamily: "Georgia", 
            fontSize: "30px", 
            paddingTop:"30px", 
            paddingBottom: "30px"}}>{ingredient.title}</h1>
            <div>{ingredient.image !== null && <img src={ingredient.image} alt="ingredient"  
            style = {{width: "50%", 
            marginBottom: "30px",
            fontSize:"40px"}}></img>}</div>
            
            <div className = "ing-info">
                <p><span style={{ fontWeight: 'bold' }}>Calories: </span>{ingredient.calories}</p>
                <p><span style={{ fontWeight: 'bold' }}>Sugars: </span>{ingredient.sugars}</p>
                <p><span style={{ fontWeight: 'bold' }}>Carbohydrates: </span>{ingredient.carbs}</p>
                <p><span style={{ fontWeight: 'bold' }}>Protein: </span>{ingredient.protein}</p>
                <p><span style={{ fontWeight: 'bold' }}>Serving(s) </span>{ingredient.serving}</p>
            </div>
        </section>

        <section className = "diet-section">
            <h3 style = {{fontFamily:"Verdana"}}>Diet Groups</h3>
            
            /**insert here for diet groups */
        </section>

        <section className = "recipe-section">
        <h3 style = {{fontFamily:"Verdana"}}>Recipes</h3>
        {ingredient.recipes.map(function(r) {
            return (
                <div>
                <Link to={"http://localhost:3000/recipes/view/" + r.id} className = "contents">{r.title}</Link>
                </div>
            )
            })}
        </section>

    </div>
    );
}

export default IngredientLanding;
