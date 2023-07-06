import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import DietGroupInstance from "./DietGroupInstance";
import { Link } from "react-router-dom";
import "../style/DietStyle.css"


function DietGroupLanding() {
    const [id, setId] = useState(0);

    useEffect(() => {
        const my_url = window.location.href;
        var parts = my_url.split("/");
        var result = parts[parts.length - 1];
        const url_id = Number(result);
        console.log(url_id);
        setId(url_id);
      }, []);
    
    
    let initData: DietGroupInstance = {
        id: 0,
        recipes: [],
        title: "",
        image: "",
        desc: "",
        prohibits: "",
        percentage: 0.0,
        membership: [],
        ingredients: [],
        };


    const [dietgroup, setDietGroup] = useState<DietGroupInstance>(initData);
    const api_url = "http://localhost:5000";
    

    const make_flask_call = () => {
        const dietgroup_url = api_url + "/dietgroups/" + id;
        console.log(dietgroup_url);
        axios
            .get(dietgroup_url)
            .then(function (response) {
                // handle success
                let res = response.data[0];
                console.log(res);
                setDietGroup({
                    id: res.id,
                    recipes:  res.recipes,
                    title: res.title,
                    image: res.src,
                    desc: res.desc,
                    prohibits: res.prohibits,
                    percentage: res.percentage,
                    membership: res.membership,
                    ingredients: res.ingredients.slice(0, 20)
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
        <section className = "diet-section-diet">
            <h1 style = {{fontFamily: "Georgia", 
                fontSize: "30px", 
                paddingTop:"30px", 
                paddingBottom: "30px"}}>{dietgroup.title}</h1>
            <div>{dietgroup.image !== null && <img src={dietgroup.image} alt="dietgroup"
            style = {{width: "50%", 
                marginBottom: "30px",
                fontSize:"40px"}}></img>}</div>
        
            <div className = "diet-info-diet">
                <p><span style={{ fontWeight: 'bold' }}>Diet ID: </span>{dietgroup.id}</p>
                <p style = {{marginLeft: "40px", marginRight: "40px"}}><span style={{ fontWeight: 'bold' }}>Description: </span>{dietgroup.desc}</p>
                <p><span style={{ fontWeight: 'bold' }}>Restrictions: </span>{dietgroup.prohibits}</p>
                <p><span style={{ fontWeight: 'bold' }}>Percentage in the Population: </span>{dietgroup.percentage}%</p>
                <span style={{ fontWeight: 'bold' }}>Contains: </span>
                {dietgroup.membership.map(function(m) {
                    return (
                <div>
                    {m}
                </div>
                )
                })}
            </div>
        </section>
        
        <section className = "ing-section-diet">
            <h3 style = {{fontFamily:"Verdana"}}>Here Are Some Ingredients In This Diet Group</h3>
            {dietgroup.ingredients.map(function(i) {
                return (
                <div>
                    <Link to={"http://localhost:3000/ingredients/view/" + i.id} className = "contents-diet">{i.title}</Link>
                </div>
                )
                })}

        </section>

        <section className = "recipe-section-diet">
            <h3 style = {{fontFamily:"Verdana"}}>Recipes</h3>
            {dietgroup.recipes.map(function(r) {
                return (
                <div>
                    <Link to={"http://localhost:3000/recipes/view/" + r.id} className = "contents-diet">{r.title}</Link>
                </div>
                )
                })}
        <br></br>
        </section>
    </div>
    );
}

export default DietGroupLanding;

