import axios from "axios";
import React from "react";
import { useState, useEffect, SetStateAction } from "react";
import DietGroupInstance from "./DietGroupInstance";
import { Link } from "react-router-dom";
import "../style/DietStyle.css";

function DietGroupLanding() {
  const [id, setId] = useState(0);

  useEffect(() => {
    const my_url = window.location.href;
    var parts = my_url.split("/");
    var result = parts[parts.length - 1];
    const url_id = Number(result);
    console.log(url_id);
    setId(url_id);
  }, []);

  let initData: DietGroupInstance = {
    id: 0,
    recipes: [],
    title: "",
    image: "",
    desc: "",
    prohibits: "",
    percentage: 0.0,
    membership: [],
    ingredients: [],
  };

  const [dietgroup, setDietGroup] = useState<DietGroupInstance>(initData);
  // const api_url = "http://localhost:5000";
  const api_url = "http://testingreactdeployment.uc.r.appspot.com";

  const front_url = "http://localhost:3000";
  // FOR LOCAL USE
  // UNCOMMENT THE LINE BELOW TO RUN LOCALLY
  // const front_url = "dietriot.me";

  const make_flask_call = () => {
    const dietgroup_url = api_url + "/dietgroups/" + id;
    console.log(dietgroup_url);
    axios
      .get(dietgroup_url)
      .then(function (response) {
        // handle success
        let res = response.data[0];
        console.log(res);
        setDietGroup({
          id: res.id,
          recipes: res.recipes,
          title: res.title,
          image: res.src,
          desc: res.desc,
          prohibits: res.prohibits,
          percentage: res.percentage,
          membership: res.membership,
          ingredients: res.ingredients.slice(0, 20),
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    make_flask_call();
  }, [id]);

  return (
    <div className="App">
      <section className="diet-section-diet">
        <h2
          className="instance-h2-styling"
          style={{
            fontSize: "30px",
            paddingTop: "60px",
            paddingBottom: "30px",
            textTransform: "uppercase",
            fontWeight: "heavy",
          }}
        >
          The {dietgroup.title} DIET
        </h2>
        <div>
          {dietgroup.image !== null && (
            <img
              className="dietIMG"
              src={dietgroup.image}
              alt="dietgroup"
              style={{
                width: "50%",
                marginBottom: "30px",
                fontSize: "40px",
                border: "5px solid #555",
              }}
            ></img>
          )}
        </div>

        <div className="diet-info-diet">
          <p className="p-instance-pages"></p>
          <p
            className="p-instance-pages"
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginTop: "-25px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {dietgroup.desc}
          </p>
          <p className="p-instance-pages">
            <span style={{ fontWeight: "bold" }}>Restrictions: </span>
            {dietgroup.prohibits}
          </p>
          <p className="p-instance-pages">
            <span style={{ fontWeight: "bold" }}>
              Percentage of U.S. Population:{" "}
            </span>
            {dietgroup.percentage}%
          </p>
          <p className="p-instance-pages">
            <span style={{ fontWeight: "bold" }}>Contains: </span>
            {dietgroup.membership.join(", ")}
          </p>
        </div>
      </section>
      <div className="wrapper2-diet">
        <div className="wrapper-diet">
          <section className="ing-section-diet">
            <h2
              style={{ fontSize: "30px", paddingBottom: "15px" }}
              className="instance-h2-styling"
            >
              INGREDIENTS WITHIN THIS DIET GROUP:
            </h2>
            {dietgroup.ingredients.map(function (i) {
              return (
                <div>
                  <Link
                    to={front_url + "/ingredients/view/" + i.id}
                    className="aForDiet"
                  >
                    {i.title}
                  </Link>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <section className="recipe-section-diet-2">
        <h2
          className="instance-h2-styling"
          style={{
            fontSize: "30px",
            paddingBottom: "15px",
            paddingTop: "15px",
          }}
        >
          RECIPES WITHIN THIS DIET GROUP:
        </h2>
        {dietgroup.recipes.map(function (r) {
          return (
            <div>
              <Link
                to={front_url + "/recipes/view/" + r.id}
                className="aForDiet"
              >
                {r.title}
              </Link>
            </div>
          );
        })}
        <br></br>
      </section>
    </div>
  );
}

export default DietGroupLanding;
