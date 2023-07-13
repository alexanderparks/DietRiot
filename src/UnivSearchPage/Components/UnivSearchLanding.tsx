import "bootstrap/dist/css/bootstrap.min.css";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

function UnivSearchLanding() {
  console.log("entered file");
  const [search, setSearch] = React.useState("");
  const [didMount, setDidMount] = React.useState(false);

  const [totalNumRPages, setTotalNumRPages] = React.useState(1);
  const [totalNumIPages, setTotalNumIPages] = React.useState(1);
  const [totalNumDPages, setTotalNumDPages] = React.useState(1);

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

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const r_page = parseInt(query.get("r_page") || "1", 10);
  const i_page = parseInt(query.get("i_page") || "1", 10);
  const d_page = parseInt(query.get("d_page") || "1", 10);

  const [currRPage, setCurrRPage] = React.useState(1);

  const [currIPage, setCurrIPage] = React.useState(1);

  const [currDPage, setCurrDPage] = React.useState(1);

  React.useEffect(() => {
    setCurrRPage(r_page);
    setCurrIPage(i_page);
    setCurrDPage(d_page);
  }, [r_page, i_page, d_page]);

  const changeRPage = (event: React.ChangeEvent<unknown>, r_page: number) => {
    setCurrRPage(r_page);
    make_flask_call(search, r_page, i_page, d_page);
  };

  const changeIPage = (event: React.ChangeEvent<unknown>, i_page: number) => {
    setCurrIPage(i_page);
    make_flask_call(search, r_page, i_page, d_page);
  };

  const changeDPage = (event: React.ChangeEvent<unknown>, d_page: number) => {
    setCurrDPage(d_page);
    make_flask_call(search, r_page, i_page, d_page);
  };

  // Get search query
  React.useEffect(() => {
    const my_url = window.location.href;
    var windows = my_url.split("/");
    var currentPage = windows[windows.length - 1];
    const url_search = currentPage;
    console.log("url_search: " + url_search);
    setSearch(decodeURI(url_search));
    setDidMount(true);
  }, []);

  const [recipeData, setRecipeData] = React.useState<RecipeArray[]>([]);
  const [ingData, setIngData] = React.useState<IngArray[]>([]);
  const [dietData, setDietData] = React.useState<DietArray[]>([]);
  const [loading, setLoading] = React.useState(true);
  //change this?
  // const api_url = "http://localhost:5000/";
  const api_url = "https://dietriot-392023.uc.r.appspot.com";

  const make_flask_call = (
    search: string,
    r_page: number,
    i_page: number,
    d_page: number
  ) => {
    if (didMount) {
      const local_url = "http://localhost:3000/search/" + search;
      // const url = api_url + "search/" + search;
      const url = `${api_url}/search/${search}?r_page=${r_page}&i_page=${i_page}&d_page=${d_page}`;
      console.log("url: " + url);
      axios
        .get(url)
        .then(function (response) {
          let recipeData = response.data.recipes;
          let ingData = response.data.ingredients;
          let dietData = response.data.dietgroups;
          setIngData(
            ingData.map((item: any) => ({
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
            }))
          );
          setTotalNumIPages(response.data.i_pages);
          setRecipeData(
            recipeData.map((item: any) => ({
              image: item.src,
              id: item.id,
              calories: item.calories,
              servings: item.servings,
              recipeLink: item.recipeLink,
              title: item.title,
              ingredients: item.ingredients,
              dietgroups: item.dietgroups,
            }))
          );
          setTotalNumRPages(response.data.r_pages);
          setDietData(
            dietData.map((item: any) => ({
              id: item.id,
              recipes: item.recipes,
              title: item.title,
              image: item.src,
              desc: item.desc,
              prohibits: item.prohibits,
              percentage: item.percentage,
            }))
          );
          setTotalNumDPages(response.data.d_pages);
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
    make_flask_call(search, r_page, i_page, d_page);
  }, [search, r_page, i_page, d_page]);

  return (
    <div className="searchRow">
      <>
        {loading ? (
          console.log("loading")
        ) : (
          <div
            style={{
              background:
                "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.food52.com/rXVXOeF9qPDQxUo5yMI5Qrplp1E=/fit-in/1200x1200/dd6b1621-4b08-4b52-88f9-a0b60e89816d--2020-1013_sponsored_LG_fridge_article-hero_3x2_rocky-luten_012.jpg)",
              marginTop: "-20px",
            }}
            className="jumbotron bg-cover text-white"
          >
            <div className="container py-5 text-center">
              <br></br>
              <h1
                style={{
                  fontWeight: 300,
                  fontSize: 60,
                  fontFamily: "gill sans",
                  paddingTop: 60,
                }}
              >
                Search Results for "{search}"
              </h1>
            </div>
          </div>
        )}

        <div className="ingRow">
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
                INGREDIENTS
              </p>
            </div>
          </div>

          {loading ? (
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
                {ingData.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      marginBottom: "150px",
                    }}
                  >
                    No Results
                  </p>
                ) : (
                  ingData.slice().map((ingredient, i) => (
                    <Grid item xs={3} key={i}>
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
                        search={search}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
              <div
                className="PaginationWrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Pagination
                  page={currIPage}
                  count={totalNumIPages}
                  onChange={changeIPage}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/search/${search}?r_page=${currRPage}&$i_page=${item.page}&d_page=${currDPage}`}
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

        <div className="recRow">
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
                RECIPES
              </p>
            </div>
          </div>

          {loading ? (
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
                {recipeData.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      marginBottom: "150px",
                    }}
                  >
                    No Results
                  </p>
                ) : (
                  recipeData.slice().map((recipes, i) => (
                    <Grid item xs={3} key={i}>
                      <RecipesCard
                        id={recipes.id}
                        img_src={recipes.image}
                        name={recipes.title}
                        carlories={recipes.calories}
                        servings={recipes.servings}
                        search={search}
                        ingredients={recipes.ingredients}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
              <div
                className="PaginationWrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Pagination
                  page={currRPage}
                  count={totalNumRPages}
                  onChange={changeRPage}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/search/${search}?r_page=${item.page}&$i_page=${currIPage}&d_page=${currDPage}`}
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

        <div className="dietRow">
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
                DIET GROUPS
              </p>
            </div>
          </div>
          {loading ? (
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
                {dietData.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      marginBottom: "150px",
                    }}
                  >
                    No Results
                  </p>
                ) : (
                  dietData.slice().map((diets, i) => (
                    <Grid item xs={3} key={i}>
                      <DietCard
                        id={diets.id}
                        img_src={diets.image}
                        name={diets.title}
                        restrictions={diets.prohibits}
                        desc={diets.desc}
                        percentage={diets.percentage}
                        search={search}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
              <div
                className="PaginationWrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Pagination
                  page={currDPage}
                  count={totalNumDPages}
                  onChange={changeDPage}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/search/${search}?r_page=${currRPage}&$i_page=${currIPage}&d_page=${item.page}`}
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
      </>
    </div>
  );
}

export default UnivSearchLanding;
