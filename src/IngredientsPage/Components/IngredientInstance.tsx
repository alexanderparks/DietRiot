export default interface IngredientInstance {
    title: string;
    id: number;
    image: string;
    aisle: string;
    sugars: number;
    carbs: number;
    protein: number;
    calories: number;
    serving: string;
    recipes: any[];
  }