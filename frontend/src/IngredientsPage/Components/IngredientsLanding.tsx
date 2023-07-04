import React from "react";
import "../Style/IngredientsLanding.css";
import IngredientsCard from "./IngredientsCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";

// Pagination


function IngredientsLanding() {
    // Set the number of cards per page and the total number of pages
    const numPerPage = 8;
    const totalNumPages = 10;

    // Set up state for the current page
    const [currPage, setCurrPage] = React.useState(1);

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

    // Generate an array of cards for the current page
    const cards = Array.from({ length: numPerPage }, (_, i) => (
        <Grid item xs={6} key={i}>
        <IngredientsCard />
        </Grid>
    ));

    return (
        <div className="all">
            <div style={{
                    background: 
                        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://wallpaperaccess.com/full/4901780.jpg)',
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
                <Grid container spacing={2} sx={{ marginLeft: 4 }}>
                    {[...Array(8)].map((_, index) => (
                        <Grid item xs={3} key={index}>
                            <IngredientsCard />
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

            </div>


        </div>
    );
}

export default IngredientsLanding;