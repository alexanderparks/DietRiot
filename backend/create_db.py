from models import app, db, Recipe, Ingredient, DietGroup
import json

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

def create_recipes():
    recipe = load_json('recipes.json')
    for r in recipe['Recipes']:
        title = r['title']
        id = r['id']

        newRecipe = Recipe(title = title, id = id)

        db.session.add(newRecipe)
        db.session.commit()

create_recipes()