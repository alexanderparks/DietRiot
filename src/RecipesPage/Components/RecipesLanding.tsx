import React from "react";
import "../style/RecipesLanding.css";
import RecipesCard from "./RecipesCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RecipeInstance from "./RecipeInstance";

function RecipesLanding() {
  // Set the number of cards per page and the total number of pages
  const [totalNumPages, setTotalNumPages] = React.useState(1);

  // Set up state for the current page
  const [currPage, setCurrPage] = React.useState(1);

  // Get the current location object
  const location = useLocation();

  const navigate = useNavigate();

  const [sort, setSort] = React.useState("title");

  const [dietGroup, setDietGroup] = React.useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // Create a new URLSearchParams object from the location's search string
  const query = new URLSearchParams(location.search);

  // Get the value of the "page" query parameter, if it exists
  const page = parseInt(query.get("page") || "1", 10);

  // Update currPage whenever page changes
  React.useEffect(() => {
    setCurrPage(page);
  }, [page]);

  // Handle page changes
  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrPage(page);
    make_flask_call(page, sort, dietGroup);
  };

  const changeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    navigate("/recipes");
  };

  const changeDietGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDietGroup(event.target.value);
    navigate("/recipes");
  };

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    navigate("/recipes");
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      make_flask_call(page, sort, dietGroup);
    }
  };
  //const api_url = "http://localhost:5000";
  const api_url = "https://dietriot-392023.uc.r.appspot.com/";

  const [recipe, setRecipes] = React.useState<RecipeInstance[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);

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

  const make_flask_call = (page: number, sort: string, dietGroup: string) => {
    let rec_url = `${api_url}/recipes/?page=${page}&sort=${sort}`;
    if (dietGroup) {
      rec_url += `&dietgroup=${dietGroup}`;
    }
    if (searchQuery) {
      rec_url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    console.log(rec_url);
    axios
      .get(rec_url)
      .then(function (response) {
        // handle success
        let res = response.data.data;
        console.log(res);
        setRecipes(
          res.map((item: any) => ({
            title: item.title,
            image: item.src,
            id: item.id,
            calories: item.calories,
            servings: item.servings,
            recipeLink: item.recipeLink,
            ingredients: item.ingredients,
          }))
        );

        setTotalNumPages(response.data.pages);

        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    make_flask_call(page, sort, dietGroup);
  }, [page, sort, dietGroup]);

  return (
    <div className="all-recipe">
      <div
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000)",
          marginTop: "-20px",
        }}
        className="jumbotron bg-cover text-white"
      >
        <div className="container py-5 text-center">
          <h1
            style={{
              fontWeight: 300,
              fontSize: 60,
              fontFamily: "gill sans",
              paddingTop: 60,
            }}
          >
            RECIPES
          </h1>
          <p className="font-italic mb-0">
            Find all your favorite recipes at the click of a button, and explore
            new recipes based on ingredients you have or your diet!
          </p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row" style={{ justifyContent: "center" }}>
          <p
            style={{
              textAlign: "center",
              fontWeight: 300,
              fontFamily: "gill sans",
              fontSize: 20,
              color: "black",
              width: 275,
              height: 80,
              background: "rgba(255, 255, 255, 0.8)",
              float: "left",
              padding: 25,
              outline: "1px dashed #b06027",
              outlineOffset: -10,
            }}
          >
            Search for recipes!
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 300,
            fontFamily: "gill sans",
            fontSize: 16,
            color: "black",
            width: 240,
            height: 60,
            background: "rgba(255, 255, 255, 0.8)",
            float: "left",
            padding: "0 25px",
            outline: "1px dashed #b06027",
            outlineOffset: -10,
            marginBottom: "30px",
          }}
        >
          <label htmlFor="sort-select" style={{ marginRight: "0.5rem" }}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={changeSort}
            style={{
              fontSize: "1.0rem",
              height: "50%",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <option value="title">Title</option>
            <option value="calories">Calories</option>
            <option value="servings">Servings</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 300,
            fontFamily: "gill sans",
            fontSize: 16,
            color: "black",
            width: 300,
            height: 60,
            background: "rgba(255, 255, 255, 0.8)",
            float: "left",
            padding: "0 25px",
            outline: "1px dashed #b06027",
            outlineOffset: -10,
            marginBottom: "30px",
          }}
        >
          <label htmlFor="sort-select" style={{ marginRight: "0.5rem" }}>
            Diet Group:
          </label>
          <select
            id="sort-select"
            onChange={changeDietGroup}
            style={{
              fontSize: "1.0rem",
              height: "50%",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <option value="">All</option>
            <option value="vegan">Vegan</option>
            <option value="dairy%20free">Dairy Free</option>
            <option value="gluten%20free">Gluten Free</option>
            <option value="lacto%20ovo%20vegetarian">
              Lacto Ovo Vegetarian
            </option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole%2030">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="fodmap%20friendly">Fodmap Friendly</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 300,
            fontFamily: "gill sans",
            fontSize: 16,
            color: "black",
            width: 300,
            height: 60,
            background: "rgba(255, 255, 255, 0.8)",
            float: "left",
            padding: "0 25px",
            outline: "1px dashed #b06027",
            outlineOffset: -10,
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search recipes"
            value={searchQuery}
            onChange={changeSearch}
            onKeyDown={handleKeyPress}
          />

          <button onClick={() => make_flask_call(page, sort, dietGroup)}>
            Search
          </button>
        </div>
      </div>
      <div className="CardsWrapper">
        {isLoading ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Loading...
          </p>
        ) : (
          <>
            <Grid
              container
              sx={{
                marginLeft: 0,
                marginRight: 10,
                paddingRight: 5,
                paddingLeft: 10,
              }}
            >
              <Grid container item xs={12} justifyContent="center">
                {recipe.slice(0, 3).map((rec, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <RecipesCard
                      id={rec.id}
                      img_src={rec.image}
                      name={rec.title}
                      servings={rec.servings}
                      carlories={rec.calories}
                      ingredients={rec.ingredients}
                      search={searchQuery}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                {recipe.slice(3, 5).map((rec, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <RecipesCard
                      id={rec.id}
                      img_src={rec.image}
                      name={rec.title}
                      servings={rec.servings}
                      carlories={rec.calories}
                      ingredients={rec.ingredients}
                      search={searchQuery}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <br></br>
            <br></br>
            <div
              className="PaginationWrapper"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                page={currPage}
                count={totalNumPages}
                onChange={changePage}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/recipes${
                      item.page === 1 ? "" : `?page=${item.page}`
                    }`}
                    {...item}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  />
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipesLanding;
