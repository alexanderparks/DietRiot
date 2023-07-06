import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import DietGroupInstance from "./DietGroupInstance";
import { Link } from "react-router-dom";


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
        <p>{dietgroup.title}</p>
        <div>{dietgroup.image !== null && <img src={dietgroup.image} alt="dietgroup"></img>}</div>
        <p>{dietgroup.id}</p>
        <p>{dietgroup.desc}</p>
        <p>Prohibits: {dietgroup.prohibits}</p>
        
        <h3>Contains:  </h3>
        {dietgroup.membership.map(function(m) {
            return (
            <div>
            {m}
            </div>
            )
            })}
        <br></br>
        
        <h3>Recipes:  </h3>
        {dietgroup.recipes.map(function(r) {
            return (
            <div>
            <Link to={"http://localhost:3000/recipes/view/" + r.id}>{r.title}</Link>
            </div>
            )
            })}
        <br></br>

    </div>
    );
}

export default DietGroupLanding;

