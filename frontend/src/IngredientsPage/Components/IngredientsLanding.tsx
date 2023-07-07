import React from "react";
import "../style/IngredientsLanding.css";
import IngredientsCard from "./IngredientsCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import IngredientInstance from "./IngredientInstance";

function IngredientsLanding() {
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
        };

    // Set the number of cards per page and the total number of pages
    const numPerPage = 8;
    const totalNumPages = 15;

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
    };
    
    const local_api_url = "http://localhost:5000";
    const cloud_api_url = "http://testingreactdeployment.uc.r.appspot.com";

    const [ingredients, setIngredients] = React.useState<IngredientInstance[]>([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const make_flask_call = () => {
        const ing_url = cloud_api_url + "/ingredients";
        console.log(ing_url);
        axios
            .get(ing_url)
            .then(function (response) {
                // handle success
                let res = response.data;
                console.log(res);
                setIngredients(res.map((item: any) => ({
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

                setIsLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    React.useEffect(() => {
        make_flask_call();
    }, []);


    return (
        <div className="all">
            <div style={{
                    background: 
                        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://wallpaperaccess.com/full/4901780.jpg)',
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
                    INGREDIENTS
                    </h1>
                    <p className="font-italic mb-0">
                    Discover recipes based on the ingredients you have at home and see
                    what you need to buy to cook something new today!
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
                    Search for ingredients!
                    </p>
                </div>
            </div>
            <div className="CardsWrapper">
                {isLoading ? (
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Loading...</p>
                ) : (
                    <>
                    <Grid container sx={{ marginLeft: 0, marginRight: 10, paddingRight: 5, paddingLeft: 10}}>
                        {ingredients.slice(startIndex, endIndex).map((ingredient, i) => (
                            <Grid item xs={3} key={i}>
                                <IngredientsCard id = {ingredient.id} img_src={ingredient.image} name={ingredient.title}
                                                    calories={ingredient.calories} sugars={ingredient.sugars} carbs={ingredient.carbs} protein={ingredient.protein}
                                                        serving={ingredient.serving}/>
                            </Grid>
                        ))}
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
                                to={`/ingredients${item.page === 1 ? "" : `?page=${item.page}`}`}
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