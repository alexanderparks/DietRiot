import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import postmanIcon from "@iconify-icons/simple-icons/postman";

import "../Style/AboutPageLanding.css";
import Axios from "axios";

import monique from "../Assets/monique.jpg";
import thomas from "../Assets/thomas.jpg";
import rey from "../Assets/rey.jpg";
import alex from "../Assets/alex_profile.jpg";
import regina from "../Assets/regina.jpg";
import gdc from "../Assets/gdc.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3, faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";

// Define an object to map usernames to contributor names
var nameMap: { [key: string]: string } = {
  "Alexander Parks": "alexparks",
  "Monique Tran": "mkatiatran",
  "Heyu Zhou": "regina.zhou",
  "Rey Sanchez Samper": "sadansanchez3",
  "Thomas Skrovan": "thejaryak",
};

let idList = [
  "mkatiatran",
  "thejaryak",
  "sadansanchez3",
  "alexparks",
  "regina.zhou",
];

function RetriveCommitData() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await Axios.get(
      "https://gitlab.com/api/v4/projects/46955283/repository/contributors?order_by=name"
    );
    setComments(response.data);
  };
  var commitData: { [key: string]: number } = {};
  var data: { [key: number]: { [keyy: string]: string } } = comments;
  for (var idx in data) {
    var name = data[idx]["name"];
    if (commitData[nameMap[name]] == undefined) {
      commitData[nameMap[name]] = parseInt(data[idx]["commits"], 10);
    } else {
      commitData[nameMap[name]] += parseInt(data[idx]["commits"], 10);
    }
  }
  for (var name in commitData) {
    console.log(name);
  }

  return commitData;
}

function RetriveIssueData(i: number) {
  const [comments, setComments] = useState([]);
  var count = 0;

  useEffect(() => {
    fetchComments(i);
  }, []);

  count = 0;
  for (var temp in comments) {
    count = count + 1;
  }

  const fetchComments = async (i: number) => {
    const response = await Axios.get(
      "https://gitlab.com/api/v4/projects/46955283/issues?author_username=" +
        idList[i]
    );
    setComments(response.data);
  };
  return count;
}

function AboutPageLanding() {
  var issueData: { [key: string]: number } = {};
  for (let i = 0; i < 5; i++) {
    issueData[idList[i]] = RetriveIssueData(i);
  }
  var commitData: { [key: string]: number } = RetriveCommitData();
  var totalCommitData =
    commitData["alexparks"] +
    commitData["mkatiatran"] +
    commitData["regina.zhou"] +
    commitData["sadansanchez3"] +
    commitData["thejaryak"];
  var totalIssuesData =
    issueData["alexparks"] +
    issueData["mkatiatran"] +
    issueData["regina.zhou"] +
    issueData["sadansanchez3"] +
    issueData["thejaryak"];

  return (
    <div className="all-about">
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${gdc})`,
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
            ABOUT US
          </h1>
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
              width: 300,
              height: 80,
              background: "rgba(255, 255, 255, 0.8)",
              float: "left",
              padding: 25,
              outline: "2.5px dashed #de6449",
              outlineOffset: -10,
            }}
          >
            Meet the team!
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        <div className="card" style={{ width: "19rem", marginRight: 20 }}>
          <img
            className="img-fluid img-profile rounded-square mx-auto mb-2"
            src={monique} // Update this to the correct path to the monique.jpg image file
            alt="monique_profile"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Monique Tran</h5>
            <p className="card-text">
              I am a third year undergraduate, and while my professional
              interests lie outside of SWE, I enjoy learning new skills and
              programming languages!
            </p>
          </div>
          <div className="card-footer">
            <div>
              <span className="highlight">Responsibilities:</span> (Phase 1)
              Group Leader and creating the model cards using the RESTful API
              and Bootstrap. (Phase 2) Group leader, using Flask to create API
              calls that will later populate the database and models using
              SQLAlchemy and PostgreSQL, connecting the database to the Flask
              back-end, and populating instance pages with the collected data
              using React and Axios. (Phase 3) Group leader, implementing
              sorting, filtering, and searching into the back-end using Python
              and SQLAlchemy and hosting using GCP and AWS.
            </div>
            <div>
              <span className="highlight">Number of commits:</span>{" "}
              <span id="monique-commits">{commitData["mkatiatran"]}</span>
            </div>
            <div>
              <span className="highlight">Number of issues:</span>{" "}
              <span id="monique-issues">{issueData["mkatiatran"]}</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "19rem", marginRight: 20 }}>
          <img
            className="img-fluid img-profile rounded-square mx-auto mb-2"
            src={thomas} // Update this to the correct path to the monique.jpg image file
            alt="thomas_profile"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Thomas Skrovan</h5>
            <p className="card-text">
              I am an undergraduate computer science student in the class of
              2025. Outside of programming, I enjoy playing sports, competing
              with the{" "}
              <a
                href="https://sites.utexas.edu/mensclubvolleyball/"
                target="_blank"
              >
                Texas Men’s Volleyball Club
              </a>
              , and spending time with friends.
            </p>
          </div>
          <div className="card-footer">
            <div>
              <span className="highlight">Responsibilities:</span> (Phase 1)
              Designing the RESTful API using Postman and obtaining a URL for
              the website. (Phase 2) Using Flask to create API calls that will
              later populate the database and models using SQLAlchemy and
              PostgreSQL, connecting the database to the Flask back-end, and
              populating instance pages with the collected data using React and
              Axios. (Phase 3) Implementing sorting, filtering, and searching
              into the back-end using Python and SQLAlchemy and hosting using
              GCP and AWS.
            </div>
            <div>
              <span className="highlight">Number of commits:</span>{" "}
              <span id="thomas-commits">92</span>
            </div>
            <div>
              <span className="highlight">Number of issues:</span>{" "}
              <span id="thomas-issues">{issueData["thejaryak"]}</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "19rem", marginRight: 20 }}>
          <img
            className="img-fluid img-profile rounded-square mx-auto mb-2"
            src={rey} // Update this to the correct path to the monique.jpg image file
            alt="rey_profile"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Rey Sanchez Samper</h5>
            <p className="card-text">
              I'm a senior computer science student. Outside of school, I enjoy
              drawing and spending my time listening to history and science
              podcasts.
            </p>
          </div>
          <div className="card-footer">
            <div>
              <span className="highlight">Responsibilities:</span> (Phase 1)
              Creating the "About Us" page and dynamically populating it with
              the Gitlab API using Bootstrap. (Phase 2) Using React to develop
              front-end functionality and model cards, adding pagination to the
              site with Material UI, and styling the model and instance pages
              using React. (Phase 3) Implementing sorting, filtering, and
              searching into the front-end using TypeScript and completing the
              pagination of all model pages.
            </div>
            <div>
              <span className="highlight">Number of commits:</span>{" "}
              <span id="rey-commits">{commitData["sadansanchez3"]}</span>
            </div>
            <div>
              <span className="highlight">Number of issues:</span>{" "}
              <span id="rey-issues">{issueData["sadansanchez3"]}</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "19rem", marginRight: 20 }}>
          <img
            className="img-fluid img-profile rounded-square mx-auto mb-2"
            src={alex} // Update this to the correct path to the monique.jpg image file
            alt="alex_profile"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Alex Parks</h5>
            <p className="card-text">
              Hello! I am a third-year UT-Austin student double majoring in
              Computer Science and Mathematics. My academic and career interests
              include data science, machine learning, artificial intelligence,
              and software engineering. Outside of academics, I enjoy watching
              films, playing or watching sports, hiking, and travelling!
            </p>
          </div>
          <div className="card-footer">
            <div>
              <span className="highlight">Responsibilities:</span> (Phase 1)
              Writing an initial technical report using GitLab Wiki and aiding
              in the creation of instance pages for each model. (Phase 2)
              Refining and implementing the RESTful API, writing a technical
              report, and creating unit tests for the API and models. (Phase 3)
              Completed the technical report/GitLab Wiki and updated dynamic
              linkages in the "About Us" page.
            </div>
            <div>
              <span className="highlight">Number of commits:</span>{" "}
              <span id="alex-commits">{commitData["alexparks"]}</span>
            </div>
            <div>
              <span className="highlight">Number of issues:</span>{" "}
              <span id="alex-issues">{issueData["alexparks"]}</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "19rem", marginRight: 20 }}>
          <img
            className="img-fluid img-profile rounded-square mx-auto mb-2"
            src={regina} // Update this to the correct path to the monique.jpg image file
            alt="regina_profile"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Regina Zhou</h5>
            <p className="card-text">
              I am a junior undergraduate student studying Computer Science at
              UT Austin. I have a passion for coding, and I also enjoy creating
              mini-games in my spare time.
            </p>
          </div>
          <div className="card-footer">
            <div>
              <span className="highlight">Responsibilities:</span> (Phase 1)
              Creating the Home/Splash page and the navbar for all pages using
              Bootstrap. (Phase 2) Using yUML to create a UML class diagram,
              converting pages from .html to .tsx files using React, adding
              pagination to the site, and styling the model and instance pages
              using React. (Phase 3) Implementing and styling sorting,
              filtering, and searching into the front-end using TypeScript and
              developing highlighting for search results.
            </div>
            <div>
              <span className="highlight">Number of commits:</span>{" "}
              <span id="regina-commits">{commitData["regina.zhou"]}</span>
            </div>
            <div>
              <span className="highlight">Number of issues:</span>{" "}
              <span id="regina-issues">{issueData["regina.zhou"]}</span>
            </div>
          </div>
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
              width: 300,
              height: 80,
              background: "rgba(255, 255, 255, 0.8)",
              float: "left",
              padding: 25,
              outline: "2.5px dashed #de6449",
              outlineOffset: -10,
            }}
          >
            Stats
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: 300, height: 250 }}>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item" id="total-commits">
                Total no. of commits: 324
              </li>
              <li className="list-group-item" id="total-issues">
                Total no. of issues: {totalIssuesData}
              </li>
              <li className="list-group-item">
                GitLab Issue Tracker:{" "}
                <a
                  href="https://gitlab.com/mkatiatran/cs-373-website/-/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  DietRiot Issue List
                </a>
              </li>
              <li className="list-group-item">
                GitLab Repo:{" "}
                <a href="https://gitlab.com/mkatiatran/cs-373-website">
                  DietRiot Repo
                </a>
              </li>
              <li className="list-group-item">
                GitLab Wiki:{" "}
                <a href="https://gitlab.com/mkatiatran/cs-373-website/-/wikis/home">
                  DietRiot Wiki
                </a>
              </li>
            </ul>
          </div>
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
              width: 300,
              height: 80,
              background: "rgba(255, 255, 255, 0.8)",
              float: "left",
              padding: 25,
              outline: "2.5px dashed #de6449",
              outlineOffset: -10,
            }}
          >
            Data
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: 300, height: 375 }}>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Data:{" "}
                <a
                  href="https://spoonacular.com/food-api"
                  target="_blank"
                  rel="noreferrer"
                >
                  spoonacular API
                </a>
              </li>
              <li className="list-group-item">
                Postman Collection:{" "}
                <a
                  href="https://documenter.getpostman.com/view/28161567/2s93zFWKAV#b4f82bbf-17a3-4e58-bc41-b3c5434e2e9a"
                  target="_blank"
                  rel="noreferrer"
                >
                  DietRiot API
                </a>
              </li>
              <li className="list-group-item">
                Description of how it was scraped:
                {
                  " We used an API key to service our request and included recipe information/nutrition and ingredient information per recipe per each call. For each call to the API, we requested 100 instances at a time."
                }
              </li>
            </ul>
          </div>
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
              width: 300,
              height: 80,
              background: "rgba(255, 255, 255, 0.8)",
              float: "left",
              padding: 25,
              outline: "2.5px dashed #de6449",
              outlineOffset: -10,
            }}
          >
            Tools Used
          </p>
        </div>
      </div>

      <div className="social-icons">
        <a className="social-icon">
          <FontAwesomeIcon icon={faHtml5} />
        </a>
        <a className="social-icon">
          <FontAwesomeIcon icon={faCss3} />
        </a>
        <a className="social-icon">
          <FontAwesomeIcon icon={faFlask} />
        </a>
        <a className="social-icon">
          <FontAwesomeIcon icon={faGitlab} />
        </a>
        <Icon
          icon={postmanIcon}
          style={{
            color: "#1c9cfc",
            paddingTop: 15,
            paddingLeft: 1,
            width: "1.3em",
            height: "1.3em",
          }}
        />
      </div>
    </div>
  );
}

export default AboutPageLanding;
