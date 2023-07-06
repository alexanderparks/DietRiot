import NavigationBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';  
import "../style/HomePageStyle.css";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";

function HomePageLanding(){
  return(
  <div className = "homePage">
    <section className = "main_image">
    <div className="container text-center">
        <h1
          style={{
          color: "white",
          fontSize: "100px", 
          fontFamily: "verdana", 
          paddingTop: "150px",
          }}>DietRiot</h1>

        <p style = {{
        color: "lightgray",
        fontSize: "30px", 
        paddingBottom: "300px",
        fontFamily: "verdana", 
        textAlign: "center"}}>
        Revolutionize Your Plate
        </p>
      </div>
    </section>

  <section className="cards card_image">
  <CardGroup className = "gap-3 p-3">
      <Card>
        <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://pngimg.com/d/turkey_food_PNG18.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://images.heb.com/is/image/HEBGrocery/000972208-1"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Card.Text>
          <p className = "card-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>
            You don't have to cook fancy or complicated masterpieces—just good food from fresh ingredients.</p>
            <p className="card-name">--Julia Child</p>
          </Card.Text>
          <div className = "text-center">
            <a href="../ingredients/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px", fontFamily:"verdana"}}>Pick Ingredients</a>
          </div>
        </Card.Body>
      </Card>



      <Card>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://www.seriouseats.com/thmb/HM36ntDqT93JZqJTh2zdCFqygQg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__05__20140530-one-pot-wonders-turkey-burgers-0daef55b338944afa44a4887a7529d0d.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://images.food52.com/ojYYwmMw_QcDyajP06dGLk_94X4=/1930x1286/filters:format(webp)/4932babe-6786-4653-bfdb-872c171a72bd--food52_10-25-11-3782.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://www.seriouseats.com/thmb/3wUBeoEFIhxDlbMJdWi5ppZz4Pk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__10__20141022-kale-pizza-7-3330b9fddcc04989ac7492cd28f16da7.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Card.Text>
          <p className = "card-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>A recipe is a story that ends with a good meal.</p>
            <p className="card-name">--Pat Conroy</p>
          </Card.Text>
          <div className = "text-center">
            <a href="../recipes/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px", fontFamily:"verdana"}}>Choose Recipes</a>
          </div>
        </Card.Body>
      </Card>



      <Card>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://static.trip101.com/paragraph_media/pictures/001/595/541/large/pexels-photo-958545.jpeg?1553522832"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item"
          src="https://www.restaurantware.com/media/magefan_blog/gluten_free_article_-_Thumbnail.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Card.Text>
          <p className = "card-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>Let food be thy medicine and medicine be thy food.</p>
            <p className="card-name">--Hippocrates</p>
          </Card.Text>
          <div className = "text-center">
            <a href="../dietGroups/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px", fontFamily:"verdana", paddingTop: "15px", paddingBottom: "15px"}}>Select Diets</a>
          </div>
        </Card.Body>
      </Card>
    </CardGroup>
  </section>
  
  <div className = "motivation" 
    style={{
    padding: '10px 30px 100px 30px',
    overflowX: 'hidden'}}>
   
   <h1 style={{
   textAlign:'center', 
   fontFamily:'optima',
   paddingBottom: '0px',
   marginBottom: '0px',
   borderBottom: '0px'
  }}> Our Motivation</h1>
   <h3 style={{
   textAlign:'center',
   fontFamily: 'optima',
   fontSize:'20px',
   paddingTop: '0px',
   marginTop: '0px',
   borderTop: '0px',
   }}>Why did we create DietRiot?</h3>
   <p style={{
   textIndent:'50px',
   fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
   fontSize: '20px'
   }}>Finding and managing recipes and ingredients can often be the hardest part of sticking to a diet. 
     Our team set out to alleviate this issue when we created DietRiot. With DietRiot, users can 
     browse and compare recipes and ingredients that fit the restrictions of their diet. Users can also 
     utilize DietRiot to view attributes and statistics about specific recipes, ingredients, or diet groups. 
     Whether a user is beginning a diet, continuing a diet, or just looking for some new recipes, 
     DietRiot provides an expansive and easily navigable medium to aid in these processes!</p>
 </div>
  </div>
  );
}
export {
  NavigationBar,
  HomePageLanding
};