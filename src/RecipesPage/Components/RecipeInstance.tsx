export default interface RecipeInstance {
    calories: number;
    id: number;
    ingredients: any[];
    dietgroups: any[];
    title: string;
    recipeLink: string;
    image: string;
    servings: number;
  }

  export default interface RecipeArray {
    [key: number]: RecipeInstance;
  }
  