import 'bootstrap/dist/css/bootstrap.min.css';  
import IngArray from "../../IngredientsPage/Components/IngredientInstance";
import RecipeArray from "../../RecipesPage/Components/RecipeInstance";
import DietArray from "../../DietGroupsPage/Components/DietGroupInstance";
import IngredientsCard from "../../IngredientsPage/Components/IngredientsCard";
import RecipesCard from "../../RecipesPage/Components/RecipesCard";
import DietCard from "../../DietGroupsPage/Components/DietGroupsCard";
import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import "../style/univSearchStyle.css";

function UnivSearchLanding() {
    console.log("entered file")
    const [search, setSearch] = React.useState("");
    const [didMount, setDidMount] = React.useState(false);
    // reloads the page whenever hit back button
    React.useEffect(() => {
      const handlePopstate = () => {
        window.location.reload();
      };
  
      window.addEventListener("popstate", handlePopstate);
  
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);
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
    

    const [recipeData, setRecipeData] = React.useState<RecipeArray[]>([]);
    const [ingData, setIngData] = React.useState<IngArray[]>([]);
    const [dietData, setDietData] = React.useState<DietArray[]>([]);
    const [loading, setLoading] = React.useState(true);
    //change this?
    const api_url = "http://localhost:5000/";
    
    const make_flask_call = (search: string) => {
      if (didMount) {
        const local_url = "http://localhost:3000/search/" + search;
        const url = api_url+ "search/" + search;
  
        console.log("url: " + url);
        axios
          .get(url)
          .then(function (response) {
            let recipeData = response.data.recipes;
            let ingData = response.data.ingredients;
            let dietData = response.data.dietgroups;
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
            setRecipeData(recipeData.map((item: any) => ({
              image: item.src,
              id: item.id,
              calories: item.calories,
              servings: item.servings,
              recipeLink: item.recipeLink,
              title: item.title
            })));
            setDietData(dietData.map((item: any) => ({
              id: item.id,
              recipes:  item.recipes,
              title: item.title,
              image: item.src,
              desc: item.desc,
              prohibits: item.prohibits,
              percentage: item.percentage,
            })));
            
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
    };
    React.useEffect(() => {
      make_flask_call(search);
  }, [search]);
    
    return (
      <div className="Search">
        <>
        {loading ? (
          console.log("loading")
        ) : (
          <h1 style = {{marginLeft:"30px", fontFamily: "Arial"}}>
            Search Results for "{search}"
          </h1>
        )}
  
        <h3 className = "names">
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
                                serving={ingredient.serving}
                                search = {search}/>
                            </Grid>
                        ))}
        </Grid>

        <h3 className = "names">
          Recipes
        </h3>
            
        <Grid container sx={{ marginLeft: 0, marginRight: 10, paddingRight: 5, paddingLeft: 10}}>
                        {recipeData.slice().map((recipes, i) => (
                            <Grid item xs={3} key = {i}>
                                <RecipesCard 
                                id = {recipes.id}
                                img_src = {recipes.image}
                                name = {recipes.title}
                                carb = {recipes.calories}
                                servings = {recipes.servings}/>
                            </Grid>
                        ))}
        </Grid>

        <h3 className = "names">
          Diet Groups
        </h3>
            
        <Grid container sx={{ marginLeft: 0, marginRight: 10, paddingRight: 5, paddingLeft: 10}}>
                        {dietData.slice().map((diets, i) => (
                            <Grid item xs={3} key = {i}>
                                <DietCard 
                                id = {diets.id}
                                img_src = {diets.image}
                                name = {diets.title}
                                restrictions = {diets.prohibits}
                                desc = {diets.desc}
                                percentage = {diets.percentage}
                                />
                            </Grid>
                        ))}
        </Grid>
        </>
      </div>
    );
  }
  

export default UnivSearchLanding;
