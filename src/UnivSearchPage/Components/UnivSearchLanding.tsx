import 'bootstrap/dist/css/bootstrap.min.css';  
import IngArray from "../../IngredientsPage/Components/IngredientInstance";
import RecipeArray from "../../RecipesPage/Components/RecipeInstance";
import DietArray from "../../DietGroupsPage/Components/DietGroupInstance";
import IngredientsCard from "../../IngredientsPage/Components/IngredientsCard";
import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
function UnivSearchLanding() {
    const [search, setSearch] = React.useState("");
    const [didMount, setDidMount] = React.useState(false);
    console.log("entered file")
    // Get search query
    React.useEffect(() => {
      const my_url = window.location.href;
      var windows = my_url.split("/");
      var currentPage = windows[windows.length - 1];
      const url_search = currentPage;
      console.log("url_search: " + url_search)
      setSearch(decodeURI(url_search));
      setDidMount(true);
    }, []);
    
    let initData: IngArray = {
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

    const [recipeData, setRecipeData] = React.useState<RecipeArray[]>([]);
    const [ingData, setIngData] = React.useState<IngArray[]>([]);
    const [dietData, setDietData] = React.useState<DietArray[]>([]);
    const [loading, setLoading] = React.useState(true);
    //change this?
    const api_url = "http://localhost:5000/";
    
    React.useEffect(() => {
      if (didMount) {
        const local_url = "http://localhost:3000/search/" + search;
        const url = api_url+ "search/" + search;
  
        console.log(url);
        axios
          .get(url)
          .then(function (response) {
            let recipeData = response.data.recipeList;
            
            let ingData = response.data.ingredients;
            let dietData = response.data.dietgroupList;
            setRecipeData(recipeData);
            setIngData(ingData);
            setIngData(ingData.map((item: any) => ({
              title: item.title,
              image: item.src,
              id: item.id,
              aisle: item.aisle,
              sugars: item.sugars,
              carbs: item.carbs,
              protein: item.protein,
              calories: item.calories,
              serving: item.serving,
              recipes: item.recipes,
          })));
            setDietData(dietData);
            setLoading(false);
  
            // handle succes
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      }
    }, [search]);
  
    /*
    const getHighlightedText = (text: string, highlight: any) => {
      // Split on highlight term and include term into parts, ignore case
      const parts = text.split(new RegExp(`(${highlight})`, "gi"));
      return (
        <span>
          {" "}
          {parts.map((part: any, i: any) => (
            <span
              key={i}
              style={
                part.toLowerCase() === highlight.toLowerCase()
                  ? { fontWeight: "bold" }
                  : {}
              }
            >
              {part}
            </span>
          ))}{" "}
        </span>
      );
    };
  */
    return (
      <div className="Search">
        <>
        {loading ? (
          console.log("loading")
        ) : (
          <h1>
            Search Results for "{search}"
          </h1>
        )}
  
        <h3>
          Ingredients
        </h3>
            
        <Grid container sx={{ marginLeft: 0, marginRight: 10, paddingRight: 5, paddingLeft: 10}}>
                        {ingData.slice().map((ingredient, i) => (
                            <Grid item xs={3} key = {i}>
                                <IngredientsCard 
                                id = {ingredient.id} 
                                img_src={ingredient.image} 
                                name={ingredient.title}
                                calories={ingredient.calories} 
                                sugars={ingredient.sugars} 
                                carbs={ingredient.carbs} 
                                protein={ingredient.protein}
                                serving={ingredient.serving}/>
                            </Grid>
                        ))}
        </Grid>
        </>
      </div>
    );
  }
  

export {
    UnivSearchLanding
};