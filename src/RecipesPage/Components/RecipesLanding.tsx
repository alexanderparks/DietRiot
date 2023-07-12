import React from "react";
import "../style/RecipesLanding.css";
import RecipesCard from "./RecipesCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import RecipeInstance from "./RecipeInstance";

function RecipesLanding() {
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

    // Set the number of cards per page and the total number of pages
    const numPerPage = 8;
    const totalNumPages = 50;

    // Set up state for the current page
    const [currPage, setCurrPage] = React.useState(1);
    
    const startIndex = (currPage - 1) * numPerPage;
    const endIndex = startIndex + numPerPage;

    // Get the current location object
    const location = useLocation();

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
        make_flask_call(page);
    };
    
    const api_url = "http://localhost:5000";
    //const api_url = "http://testingreactdeployment.uc.r.appspot.com";

    const [recipe, setRecipes] = React.useState<RecipeInstance[]>([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const make_flask_call = (page: number) => {
        const ing_url = `${api_url}/recipes/?page=${page}`;
        console.log(`making API call to ${ing_url}`);
        axios
            .get(ing_url)
            .then(function (response) {
                // handle success
                let res = response.data.data;
                console.log(`API response:`);
                console.log(res);
                setRecipes(res.map((item: any) => ({
                    title: item.title,
                    image: item.src,
                    id: item.id,
                    calories: item.calories,
                    servings: item.servings,
                    recipeLink: item.recipeLink
                })));
    
                setIsLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoading(false);
            });
    };    
    
    React.useEffect(() => {
        make_flask_call(page);
    }, [page]);

    return (
        <div className="all-recipe">
            <div style={{
                    background: 
                        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000)',
                        marginTop:"-20px"
                }}
                className="jumbotron bg-cover text-white"
            >
                <div className="container py-5 text-center">
                    <h1
                    style={{
                        fontWeight: 300,
                        fontSize: 60,
                        fontFamily: 'gill sans',
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
                <div className="row" style={{ justifyContent: 'center' }}>
                    <p
                    style={{
                        textAlign: 'center',
                        fontWeight: 300,
                        fontFamily: 'gill sans',
                        fontSize: 20,
                        color: 'black',
                        width: 275,
                        height: 80,
                        background: 'rgba(255, 255, 255, 0.8)',
                        float: 'left',
                        padding: 25,
                        outline: '1px dashed #b06027',
                        outlineOffset: -10,
                    }}
                    >
                    Search for recipes!
                    </p>
                </div>
            </div>
            <div className="CardsWrapper">
                {isLoading ? (
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Loading...</p>
                ) : (
                    <>
                    <Grid container sx={{ marginLeft: 0, marginRight: 10, paddingRight: 5, paddingLeft: 10}}>
                        <Grid container item xs={12} justifyContent="center">
                            {recipe.slice(0, 3).map((rec, i) => (
                                <Grid item xs={12} md={3} key={i}>
                                    <RecipesCard id = {rec.id} img_src={rec.image} name={rec.title} servings = {rec.servings} carb = {rec.calories}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container item xs={12} justifyContent="center">
                            {recipe.slice(3, 5).map((rec, i) => (
                                <Grid item xs={12} md={3} key={i}>
                                    <RecipesCard id = {rec.id} img_src={rec.image} name={rec.title} servings = {rec.servings} carb = {rec.calories}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <br></br>
                    <br></br>
                    <div className="PaginationWrapper" style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                            page={currPage}
                            count={totalNumPages}
                            onChange={changePage}
                            renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/recipes${item.page === 1 ? "" : `?page=${item.page}`}`}
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