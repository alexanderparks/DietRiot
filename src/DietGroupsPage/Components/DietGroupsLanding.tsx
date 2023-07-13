import React from "react";
import "../style/DietGroupsLanding.css";
import DietGroupsCard from "./DietGroupsCard";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import DietGroupInstance from "./DietGroupInstance";

function DietGroupsLanding() {
  // Set the number of cards per page and the total number of pages
  const numPerPage = 4;

  // Set up state for the current page
  const [currPage, setCurrPage] = useState(1);

  const startIndex = (currPage - 1) * numPerPage;
  const endIndex = startIndex + numPerPage;

  // Get the current location object
  const location = useLocation();

  const [sort, setSort] = React.useState("title");

  const [membership, setMembership] = React.useState("");

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
    make_flask_call(sort, membership);
  };

  const changeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setCurrPage(1);
  };

  const changeMembership = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMembership(event.target.value);
    setCurrPage(1);
  };

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    setCurrPage(1);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      make_flask_call(sort, membership);
    }
  };

  //const api_url = "http://localhost:5000";
  const api_url = "http://testingreactdeployment.uc.r.appspot.com";

  const [dietgroup, setDietGroups] = useState<DietGroupInstance[]>([]);

  const totalNumPages = Math.ceil(dietgroup.length / numPerPage);

  const [isLoading, setIsLoading] = React.useState(true);

  const make_flask_call = (sort: string, membership: string) => {
    let dietgroup_url = `${api_url}/dietgroups/?sort=${sort}`;
    if (membership) {
      dietgroup_url += `&membership=${membership}`;
    }
    if (searchQuery) {
      dietgroup_url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    console.log(dietgroup_url);
    axios
      .get(dietgroup_url)
      .then(function (response) {
        // handle success
        let res = response.data;
        console.log(res);
        setDietGroups(
          res.map((item: any) => ({
            id: item.id,
            recipes: item.recipes,
            title: item.title,
            image: item.src,
            desc: item.desc,
            prohibits: item.prohibits,
            percentage: item.percentage,
          }))
        );

        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  React.useEffect(() => {
    make_flask_call(sort, membership);
  }, [sort, membership]);

  return (
    <div className="all-diet">
      <div
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://post.healthline.com/wp-content/uploads/2020/09/vegan-diet-guide-fb-1200x628.jpg)",
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
            DIET GROUPS
          </h1>
          <p className="font-italic mb-0">
            Find meals based on your dietary restrictions or explore diet groups
            to find variations of your favorite foods!
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
            Search for diet groups!
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
            <option value="percentage">Percentage</option>
            <option value="numIngredients">Number of Ingredients</option>
            <option value="numRecipes">Number of Recipes</option>
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
            width: 250,
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
            Membership:
          </label>
          <select
            id="sort-select"
            onChange={changeMembership}
            style={{
              fontSize: "1.0rem",
              height: "50%",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <option value="">All</option>
            <option value="meat">Meat</option>
            <option value="dairy">Dairy</option>
            <option value="gluten">Gluten</option>
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
            placeholder="Search diet groups"
            value={searchQuery}
            onChange={changeSearch}
            onKeyDown={handleKeyPress}
          />

          <button onClick={() => make_flask_call(sort, membership)}>
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
            <Grid container spacing={2} sx={{ marginLeft: 4 }}>
              {dietgroup.slice(startIndex, endIndex).map((dg, i) => (
                <Grid item xs={3} key={i}>
                  <DietGroupsCard
                    id={dg.id}
                    img_src={dg.image}
                    name={dg.title}
                    restrictions={dg.prohibits}
                    percentage={dg.percentage}
                    desc={dg.desc}
                    search = {searchQuery}
                  />
                </Grid>
              ))}
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
                    to={`/dietgroups${
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

export default DietGroupsLanding;
