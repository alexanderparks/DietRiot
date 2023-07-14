import React from "react";
import "../style/IngredientsLanding.css";
import IngredientsCard from "./IngredientsCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IngredientInstance from "./IngredientInstance";

function IngredientsLanding() {
  // Set the number of cards per page and the total number of pages
  const [totalNumPages, setTotalNumPages] = React.useState(1);

  // Set up state for the current page
  const [currPage, setCurrPage] = React.useState(1);

  // Get the current location object
  const location = useLocation();

  const navigate = useNavigate();

  const [sort, setSort] = React.useState("title");

  const [aisle, setAisle] = React.useState("");

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
    make_flask_call(page, sort, aisle);
  };

  const changeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    navigate("/ingredients");
  };

  const changeAisle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAisle(event.target.value);
    navigate("/ingredients");
  };

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    navigate("/ingredients");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      make_flask_call(page, sort, aisle);
    }
  };

  // const api_url = "http://localhost:5000";
  const api_url = "https://dietriot-392023.uc.r.appspot.com/";

  const [ingredients, setIngredients] = React.useState<IngredientInstance[]>(
    []
  );

  const [isLoading, setIsLoading] = React.useState(true);

  const make_flask_call = (page: number, sort: string, aisle: string) => {
    let ing_url = `${api_url}/ingredients/?page=${page}&sort=${sort}`;
    if (aisle) {
      ing_url += `&aisle=${aisle}`;
    }
    if (searchQuery.trim()) {
      ing_url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    console.log(ing_url);
    axios
      .get(ing_url)
      .then(function (response) {
        // handle success
        let res = response.data.data;
        console.log(res);
        setIngredients(
          res.map((item: any) => ({
            title: item.title,
            image: item.src,
            id: item.id,
            aisle: item.aisle,
            sugars: item.sugars.toFixed(2),
            carbs: item.carbs.toFixed(2),
            protein: item.protein.toFixed(2),
            calories: item.calories.toFixed(2),
            serving: item.serving,
            recipes: item.recipes,
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
    make_flask_call(page, sort, aisle);
  }, [page, sort, aisle]);

  return (
    <div className="all-ing">
      <div
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://wallpaperaccess.com/full/4901780.jpg)",
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
            INGREDIENTS
          </h1>
          <p className="font-italic mb-0">
            Discover recipes based on the ingredients you have at home and see
            what you need to buy to cook something new today!
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
            Search for ingredients!
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
            <option value="protein">Protein</option>
            <option value="carbs">Carbs</option>
            <option value="sugars">Sugars</option>
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
            Aisle:
          </label>
          <select
            id="sort-select"
            onChange={changeAisle}
            style={{
              fontSize: "1.0rem",
              height: "50%",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <option value="">All</option>
            <option value="Produce">Produce</option>
            <option value="Meat">Meat</option>
            <option value="Beverages">Beverages</option>
            <option value="Pasta%20and%20Rice">Pasta and Rice</option>
            <option value="Canned%20and%20Jarred">Canned and Jarred</option>
            <option value="Ethnic%20Foods">Ethnic Foods</option>
            <option value="Spices%20and%20Seasonings">
              Spices and Seasonings
            </option>
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
            placeholder="Search ingredients"
            value={searchQuery}
            onChange={changeSearch}
            onKeyDown={handleKeyPress}
          />

          <button onClick={() => make_flask_call(page, sort, aisle)}>
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
                {ingredients.slice(0, 3).map((ingredient, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <IngredientsCard
                      id={ingredient.id}
                      img_src={ingredient.image}
                      name={ingredient.title}
                      calories={ingredient.calories}
                      sugars={ingredient.sugars}
                      carbs={ingredient.carbs}
                      protein={ingredient.protein}
                      serving={ingredient.serving}
                      aisle={ingredient.aisle}
                      search={searchQuery.trim()}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                {ingredients.slice(3, 6).map((ingredient, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <IngredientsCard
                      id={ingredient.id}
                      img_src={ingredient.image}
                      name={ingredient.title}
                      calories={ingredient.calories}
                      sugars={ingredient.sugars}
                      carbs={ingredient.carbs}
                      protein={ingredient.protein}
                      serving={ingredient.serving}
                      aisle={ingredient.aisle}
                      search={searchQuery.trim()}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <br></br>
            <br></br>
            <div
              className="PaginationWrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "60px",
              }}
            >
              <Pagination
                page={currPage}
                count={totalNumPages}
                onChange={changePage}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/ingredients${
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

export default IngredientsLanding;
