from models import app, db, Recipe, Ingredient, DietGroup
import json

ingredient_bag = {}
diet_bag = {}

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

def create_dietgroups():
    dietgroups = load_json(f'./data/dietgroups/dietstats.json')
    for dg in dietgroups.items():
        newDiet = DietGroup(title = dg[0], src = dg[1]['image'], desc = dg[1]['desc'],
                            prohibits = dg[1]['prohibits'], percentage = dg[1]['percentage'], 
                            membership = dg[1]['membership'])
        diet_bag[dg[0]] = newDiet
        db.session.add(newDiet)


def create_recipes_ingredients_dietgroups():
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
                name = extended_i['nameClean']
                if not name in ingredient_bag.keys():
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
                    ingredient_bag[name] = newIngredient
                    db.session.add(newIngredient)
                    newIngredient.ing_link.append(newRecipe)
                else:
                    newIngredient = ingredient_bag[name]
                    newIngredient.ing_link.append(newRecipe)
                for d in r['diets']:
                    if diet_bag[d] not in newIngredient.dietgroups:
                        newIngredient.dietgroups.append(diet_bag[d])
                    if newIngredient.title not in diet_bag[d].ingredients:
                        diet_bag[d].ingredients.append(newIngredient)
            for d in r['diets']:
                diet_bag[d].dg_link.append(newRecipe)
            
            db.session.add(newRecipe)
    db.session.commit()

if __name__ == "__main__":
    create_dietgroups()
    create_recipes_ingredients_dietgroups()
