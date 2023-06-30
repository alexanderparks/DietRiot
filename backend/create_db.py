from models import app, db, Recipe, Ingredient, DietGroup
import json

ingredient_bag = set()
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
        recipe = load_json(f'./data/recipes/foodstats{num}.json')
        for r in recipe['results']:
            title = r['title']
            src = r['image']
            newRecipe = Recipe(title = title, src = src)
            for i in r['extendedIngredients']:
                if not i['name'] in ingredient_bag:
                    src_name = "https://spoonacular.com/cdn/ingredients_500x500/" + str(i['image'])
                    newIngredient=Ingredient(title=i['name'], src=src_name)
                    ingredient_bag.add(i['name'])
                    newIngredient.ing_link.append(newRecipe)
                    db.session.add(newIngredient)
            for d in r['diets']:
                if d not in diet_bag.keys():
                    newDiet=DietGroup(title=d)
                    diet_bag[d] = newDiet
                    db.session.add(newDiet)
                    newDiet.dg_link.append(newRecipe)
                else:
                    oldDiet = diet_bag[d]
                    oldDiet.dg_link.append(newRecipe)
            
            db.session.add(newRecipe)
    db.session.commit()


create_recipes_ingredients()
