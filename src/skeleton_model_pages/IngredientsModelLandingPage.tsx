import axios from "axios";
import React from "react"
import { useState, useEffect, SetStateAction } from "react";
import IngredientsModelInstance from "./IngredientsModelInstance";
import { Link } from "react-router-dom";


function Page() {
    const [id, setId] = useState(0);

    useEffect(() => {
        const my_url = window.location.href;
        var parts = my_url.split("/");
        var result = parts[parts.length - 1];
        const url_id = Number(result);
        console.log(url_id);
        setId(url_id);
      }, []);
    
    
    let initData: IngredientsModelInstance = {
        recipes: [],
        title: "",
        id: 0,
        src: "",
        aisle: "",
        calories: 0,
        };


    const [group, setGroup] = useState<IngredientsModelInstance>(initData);
    const api_url = "http://localhost:5000";
    // const api_url = "http://testingreactdeployment.uc.r.appspot.com";
    
    const make_flask_call = () => {
        const url = api_url + "/ingredients/";
        console.log(url);
        axios
            .get(url)
            .then(function (response) {
                // handle success
                let res = response.data[0];
                console.log(res);
                setGroup({
                    recipes: res.recipes,
                    title: res.title,
                    id: res.id,
                    src: res.src,
                    aisle: res.aisle,
                    calories: res.calories,
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
        <p>{group.title}</p>
        <p>{group.id}</p>
        <p>{group.src}</p>
        <p>{group.aisle}</p>
        <p>{group.calories}</p>

    </div>
    );
}

export default Page;

