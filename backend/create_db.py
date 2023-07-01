from models import app, db, Recipe, Ingredient, DietGroup
import json

ingredient_bag = {}
diet_bag = {}

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

jsons = ['./data/recipes/.json']
def create_recipes_ingredients():
    global ingredient_bag
    global diet_bag
    for num in range(1, 11):
        recipe = load_json(f'./data/recipes/foodstatsfull{num}.json')
        """
        Recipe has 5 attributes
        link to the recipe page / could instead put the recipe instructions
        """
        for r in recipe['results']:
            title = r['title']
            src = r['image']
            servings = r['servings']
            dishTypes = r['dishTypes']
            calories = r['nutrition']['nutrients'][0]['amount']
            recipeLink = r['sourceUrl']
            newRecipe = Recipe(title = title, src = src, servings=servings, 
                               dishTypes=dishTypes, calories=calories,
                               recipeLink=recipeLink)
            for i in range(len(r['nutrition']['ingredients'])):
                extended_i = r['extendedIngredients'][i]
                name = extended_i['name']
                if not name in ingredient_bag:
                    #extended ingredients info
                    src_name = "https://spoonacular.com/cdn/ingredients_500x500/" + str(extended_i['image'])
                    aisle = extended_i['aisle']
                    
                    #nutrition ingredients info
                    nutrional_i = r['nutrition']['ingredients'][i]
                    protein = carbs = calories = sugars = 0
                    for n in nutrional_i['nutrients']:
                        if n['name'] == "Protein":
                            protein = (1 / nutrional_i['amount']) * n['amount']
                        if n['name'] == "Carbohydrates":
                            carbs = (1 / nutrional_i['amount']) * n['amount']
                        if n['name'] == "Calories":
                            calories = (1 / nutrional_i['amount']) * n['amount']
                        if n['name'] == "Sugar":
                            sugars = (1 / nutrional_i['amount']) * n['amount']
                        
                    if nutrional_i['unit'] == "":
                        serving = "1 " + nutrional_i['name']
                    else:
                        serving = "1 " + nutrional_i['unit']
                    #compiling ingredient instance
                    newIngredient=Ingredient(title=name, src=src_name, aisle = aisle, protein = protein, carbs = carbs, sugars = sugars, serving = serving, calories = calories)
                    ingredient_bag[i] = newIngredient
                    db.session.add(newIngredient)
                    newIngredient.ing_link.append(newRecipe)
                else:
                    oldIngredient = ingredient_bag[i]
                    oldIngredient.dg_link.append(newRecipe)
            for d in r['diets']:
                if d not in diet_bag.keys():
                    newDiet = DietGroup(title = d)
                    diet_bag[d] = newDiet
                    db.session.add(newDiet)
                    newDiet.dg_link.append(newRecipe)
                else:
                    oldDiet = diet_bag[d]
                    oldDiet.dg_link.append(newRecipe)
            
            db.session.add(newRecipe)
    db.session.commit()

if __name__ == "__main__":
    create_recipes_ingredients()
