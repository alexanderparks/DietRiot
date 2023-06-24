import React from "react";
import "./Card.css";
function Card({ label }) {
  return (
    <div>
      <div className="card-container">
        <div className="image-container">
          <img src="" alt="" width="425" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{label}</h3>
          </div>
          <div className="btn">
            <button>
              <a href="">View more</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
