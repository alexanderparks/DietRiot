import logo from "./logo.svg";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [recipe, getRecipe] = useState(null);
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
        const res = response.data[0];
        setRecipe({
          name: res.title,
          image: res.src,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  function getRecipe(id) {
    setRecipeID(id);
  }

  return (
    <div className="App">
      <div>{recipe !== null && <img src={recipe.src} alt="QB"></img>}</div>

      <div>
        <button onClick={() => getRecipe(1)}>Elite Quarterback</button>
        <button onClick={() => getRecipe(2)}>Mid Quarterback</button>
      </div>
    </div>
  );
}

export default App;

