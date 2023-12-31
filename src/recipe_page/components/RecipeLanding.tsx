import axios from "axios";
import React from "react";
import { useState, useEffect, SetStateAction } from "react";
import RecipeInstance from "./RecipeInstance";
import { Link } from "react-router-dom";
import "../style/RecipeLandingStyle.css";
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
  // const api_url = "http://localhost:5000";
  const api_url = "https://dietriot-392023.uc.r.appspot.com/";

  const front_url = "https://dietriot.me";
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
          ingredients: res.ingredients.slice(),
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
      <section className="recipe-section-rec">
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
          {recipe.title}
        </h2>
        <div>
          {recipe.image !== null && (
            <img
              className="recIMG"
              src={recipe.image}
              alt="recipe"
              style={{
                width: "50%",
                marginBottom: "30px",
                fontSize: "40px",
                border: "5px solid #613108",
              }}
            ></img>
          )}
        </div>

        <div className="recipe-info-rec">
          <p
            className="p-instance-pages"
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginTop: "-25px",
            }}
          >
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Calories:</span>{" "}
              {recipe.calories}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Name: </span>
              {recipe.title}
            </p>
            <p className="p-instance-pages">
              <Link to={recipe.recipeLink} className="aForRec2">
                Link to Recipe
              </Link>
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Serving(s):</span>{" "}
              {recipe.servings}
            </p>
            <p className="p-instance-pages">
              <span style={{ fontWeight: "bold" }}>Recipe ID:</span> {recipe.id}
            </p>
          </p>
        </div>
      </section>
      <div className="wrapper2-rec">
        <div className="wrapper-rec">
          <section className="diet-section-rec-2">
            <h2
              style={{ fontSize: "30px", paddingBottom: "15px" }}
              className="instance-h2-styling"
            >
              DIET GROUPS THAT CONTAIN THIS RECIPE:
            </h2>
            {recipe.dietgroups.map(function (dg) {
              return (
                <div>
                  <Link
                    to={front_url + "/dietgroups/view/" + dg.id}
                    className="aForRec"
                  >
                    {dg.title}
                  </Link>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <section className="ings-section-rec-2">
        <h2
          className="instance-h2-styling"
          style={{
            fontSize: "30px",
            paddingBottom: "15px",
            paddingTop: "15px",
          }}
        >
          INGREDIENTS NEEDED FOR THIS RECIPE:
        </h2>
        {recipe.ingredients.map(function (i) {
          return (
            <div>
              <Link
                to={front_url + "/ingredients/view/" + i.id}
                className="aForRec"
              >
                {i.title}
              </Link>
            </div>
          );
        })}
        <br></br>
      </section>
    </div>
  );
}

export default RecipeLanding;
