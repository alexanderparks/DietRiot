from models import app, db, Recipe, Ingredient, DietGroup
import json

ingredient_bag, diet_bag = set(), set()

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

def create_recipes():
    global ingredient_bag
    global diet_bag
    recipe = load_json('./data/recipes/recipedata6.json')
    for r in recipe['results']:
        title = r['title']
        id = r['id']
        newRecipe = Recipe(title = title, id = id)
        for i in r['nutrition']['ingredients']:
            if not i['name'] in ingredient_bag:
                newIngredient=Ingredient(title=i['name'], id=i['id'])
                ingredient_bag.add(i['name'])
                newIngredient.ing_link.append(newRecipe)
                db.session.add(newIngredient)
        for d in r['diets']:
            if d not in diet_bag:
                newDiet=DietGroup(title=d)
                diet_bag.add(d)
                newDiet.dg_link.append(newRecipe)
                db.session.add(newDiet)
        
        db.session.add(newRecipe)
        db.session.commit()


create_recipes()
