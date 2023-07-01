import React from 'react';
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import DietGroups from "./pages/DietGroups";
import DietGroupInstance from "./pages/DietGroupInstance";
import RecipeInstance from "./pages/RecipeInstance";
import IngredientInstance from "./pages/IngredientInstance";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <p>Navbar</p>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/dietgroups" element={<DietGroups />} />
          <Route path="/recipes/view/:id" element={<RecipeInstance />} />
          <Route path="/ingredients/view/:id" element={<IngredientInstance />} />
          <Route path="/dietgroups/view/:id" element={<DietGroupInstance />} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App;
