import NavigationBar from "./NavBar";
import React from "react";

function HomePageLanding(){
  return(
  <div className = "all">
    <section className = "row bg-image">
    <div className = "col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
    </div>
    </section>
  
  <section className="cards" style={{
  background: "url('/frontend/src/Homepage/Assets/card_image.jpeg') no-repeat top right fixed",
  backgroundSize:"cover",
  height: "100%",
  paddingBottom: "30px",
  overflow: "hidden"}}>
    <div className="row d-flex flex-row mb-3 justify-content-center">
      <div className="col-md-4" style= {{marginTop:"20px",marginBottom:"20px"}}>
        <div className="card m-3 h-100">
          <div className="card-img-top">
          <div id="carouselControl-Ing" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg" className="d-block w-100 h-100" alt="image1"/>
              </div>
              <div className="carousel-item">
                <img src="https://pngimg.com/d/turkey_food_PNG18.png" className="d-block w-100 h-100" alt="image2"/>
              </div>
              <div className="carousel-item">
                <img src="https://images.heb.com/is/image/HEBGrocery/000972208-1" className="d-block w-100 h-100" alt="image3"/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselControl-Ing" data-bs-slide="prev" style={{color:"black"}}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselControl-Ing" data-bs-slide="next" style={{color:"black"}}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
          <div className="card-body">
            <p className="card-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
            </svg>
            You don't have to cook fancy or complicated masterpieces—just good food from fresh ingredients.</p>
              <p className="card-name">--Julia Child</p>
          
          </div>
          <div className = "text-center margin-bottom: 30px;">
            <a href="../ingredients/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px", fontFamily:"verdana"}}>Pick Ingredients</a>
          </div>
        </div>
      </div>
      <div className="col-md-4" style={{marginTop:"20px",marginBottom:"20px"}}>
        <div className="card m-3 h-100">
          <div className="card-img-top">
            <div id="carouselControl-Rec" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://www.seriouseats.com/thmb/HM36ntDqT93JZqJTh2zdCFqygQg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__05__20140530-one-pot-wonders-turkey-burgers-0daef55b338944afa44a4887a7529d0d.jpg" className="d-block w-100 h-100" alt="image1"/>
                </div>
                <div className="carousel-item">
                  <img src="https://images.food52.com/ojYYwmMw_QcDyajP06dGLk_94X4=/1930x1286/filters:format(webp)/4932babe-6786-4653-bfdb-872c171a72bd--food52_10-25-11-3782.jpg" className="d-block w-100 h-100" alt="image2"/>
                </div>
                <div className="carousel-item">
                  <img src="https://www.seriouseats.com/thmb/3wUBeoEFIhxDlbMJdWi5ppZz4Pk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__10__20141022-kale-pizza-7-3330b9fddcc04989ac7492cd28f16da7.jpg" className="d-block w-100 h-100" alt="image3"/>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselControl-Rec" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselControl-Rec" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text"
            ><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
            </svg>
            A recipe is a story that ends with a good meal.</p>
            <p className="card-name">--Pat Conroy</p>
          </div>
           
            <div className = "text-center" style={{color:"aqua"}}>
              <a href="../recipes/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px", fontFamily:"verdana"}}>Choose Recipe</a>
            </div>
          
        </div>
      </div>
      <div className="col-md-4" style={{marginTop:"20px",marginBottom:"20px"}}>
        <div className="card m-3 h-100">
          <div className="card-img-top">
            <div id="carouselControl-Diet" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://static.trip101.com/paragraph_media/pictures/001/595/541/large/pexels-photo-958545.jpeg?1553522832" className="d-block w-100 h-100" alt="image1"/>
                </div>
                <div className="carousel-item">
                  <img src="https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg" className="d-block w-100 h-100" alt="image2"/>
                </div>
                <div className="carousel-item">
                  <img src="https://www.restaurantware.com/media/magefan_blog/gluten_free_article_-_Thumbnail.png" className="d-block w-100 h-100" alt="image3"/>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselControl-Diet" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselControl-Diet" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" fill="#a29998" className="bi bi-quote" viewBox="0 -2 15 15">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>Let food be thy medicine and medicine be thy food. </p>
            <p className="card-name">--Hippocrates</p>
            <p className="invisible" > invisible</p>
      
          </div>
            <div className = "text-center">
              <a href="../diet-groups/" className="btn btn-secondary" role="button" data-toggle="button" style={{marginBottom:"100px",fontFamily:"verdana"}}>Select Diets</a>
            </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  );
}
export {
  NavigationBar,
  HomePageLanding
};