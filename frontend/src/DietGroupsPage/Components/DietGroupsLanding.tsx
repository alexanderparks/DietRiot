import React from "react";
import "../Style/DietGroupsLanding.css";
import DietGroupsCard from "./DietGroupsCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import DietGroupInstance from "./DietGroupInstance";

function DietGroupsLanding() {
    let initData: DietGroupInstance = {
        id: 0,
        recipes: [],
        title: "",
        image: "",
        desc: "",
        prohibits: "",
        percentage: 0.0,
        membership: [],
        };

    // Set the number of cards per page and the total number of pages
    const numPerPage = 4;
    const totalNumPages = 3;

    // Set up state for the current page
    const [currPage, setCurrPage] = useState(1);
    
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

    const [dietgroup, setDietGroups] = useState<DietGroupInstance[]>([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const make_flask_call = () => {
        const dietgroup_url = cloud_api_url + "/dietgroups";
        console.log(dietgroup_url);
        axios
            .get(dietgroup_url)
            .then(function (response) {
                // handle success
                let res = response.data;
                console.log(res);
                setDietGroups(res.map((item: any) => ({
                    id: item.id,
                    recipes:  item.recipes,
                    title: item.title,
                    image: item.src,
                    desc: item.desc,
                    prohibits: item.prohibits,
                    percentage: item.percentage,
                    membership: item.membership,
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
                        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://post.healthline.com/wp-content/uploads/2020/09/vegan-diet-guide-fb-1200x628.jpg)',
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
                    DIET GROUPS
                    </h1>
                    <p className="font-italic mb-0">
                    Find meals based on your dietary restrictions or explore diet groups
                    to find variations of your favorite foods!
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
                    Search for diet groups!
                    </p>
                </div>
            </div>
            <div className="CardsWrapper">
                {isLoading ? (
                    <p style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Loading...</p>
                    ) : (
                    <>
                    <Grid container spacing={2} sx={{ marginLeft: 4 }}>
                        {dietgroup.slice(startIndex, endIndex).map((dg, i) => (
                            <Grid item xs={3} key={i}>
                                <DietGroupsCard id = {dg.id} img_src={dg.image} name={dg.title} restrictions={dg.prohibits} percentage={dg.percentage}
                                                desc = {dg.desc} membership={dg.membership}/>
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
                                to={`/dietgroups${item.page === 1 ? "" : `?page=${item.page}`}`}
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

export default DietGroupsLanding;