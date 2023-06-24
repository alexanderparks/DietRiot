import React from "react";
import Card from "./components/Card";
const recipes = [
  {
    title: "Avocado Turkey Burger",
    ingredients: "avocado, turkey",
    dietgroup: "halal",
  },
  {
    title: "Carrot and Avocado Salad",
    ingredients: "avocado",
    dietgroup: "halal, gluten-free, vegetarian",
  },
  {
    title: "Kale Pizza",
    ingredients: "olive oil",
    dietgroup: "halal",
  },
];

const App = () => (
  <>
    {recipes.map((recipe, index) => (
      <div key={index}>
        <Card label={recipe.title} />
      </div>
    ))}
  </>
);

export default App;
