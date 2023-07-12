import axios from "axios";
import React from "react";
import { useState, useEffect, SetStateAction } from "react";
import IngredientInstance from "./IngredientInstance";
import { Link } from "react-router-dom";
import "../style/IngredientStyle.css";

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
    dietgroups: [],
  };

  const [ingredient, setIngredient] =
    React.useState<IngredientInstance>(initData);
  const [ingredientID, setIngredientID] = useState(1);
  // const api_url = "http://localhost:5000";
  const api_url = "http://testingreactdeployment.uc.r.appspot.com";

  const front_url = "http://localhost:3000";
  // FOR LOCAL USE
  // UNCOMMENT THE LINE BELOW TO RUN LOCALLY
  // const front_url = "dietriot.me";

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
          dietgroups: res.dietgroups,
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
      <section className="ing-section-ing">
        <h2
          className="instance-h2-styling"
          style={{
            fontSize: "30px",
            paddingTop: "60px",
            paddingBottom: "30px",
            textTransform: "uppercase",
            fontWeight: "heavy",
          }}
        >
          {ingredient.title}
        </h2>
        <div>
          {ingredient.image !== null && (
            <img
              className="ingIMG"
              src={ingredient.image}
              alt="ingredient"
              style={{
                width: "50%",
                marginBottom: "30px",
                fontSize: "40px",
                border: "5px solid #4a220d",
              }}
            ></img>
          )}
        </div>

        <div className="ing-info-ing">
          <p className="p-instance-pages"></p>
          <p
            className="p-instance-pages"
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginTop: "-25px",
            }}
          >
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Calories: </span>
              {ingredient.calories}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Sugars: </span>
              {ingredient.sugars}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Carbohydrates: </span>
              {ingredient.carbs}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Protein: </span>
              {ingredient.protein}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Serving(s) </span>
              {ingredient.serving}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Aisle: </span>
              {ingredient.aisle}
            </p>
          </p>
        </div>
      </section>
      <div className="wrapper2">
        <div className="wrapper">
          <section className="diet-section-ing-2">
            <h2
              style={{ fontSize: "30px", paddingBottom: "15px" }}
              className="instance-h2-styling"
            >
              DIET GROUPS THAT CONTAIN THIS INGREDIENT:
            </h2>
            {ingredient.dietgroups.map(function (r) {
              return (
                <div className="aForIng">
                  <Link
                    to={front_url + "/dietgroups/view/" + r.id}
                    className="aForIng"
                  >
                    {r.title}
                  </Link>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <section className="recipe-section-diet">
        <h2
          className="instance-h2-styling"
          style={{
            fontSize: "30px",
            paddingBottom: "15px",
            paddingTop: "15px",
          }}
        >
          RECIPES THAT USE THIS INGREDIENT:
        </h2>
        {ingredient.recipes.map(function (r) {
          return (
            <div>
              <Link
                to={front_url + "/recipes/view/" + r.id}
                className="aForIng"
              >
                {r.title}
              </Link>
            </div>
          );
        })}
        <br></br>
      </section>
    </div>
  );
}

export default IngredientLanding;
