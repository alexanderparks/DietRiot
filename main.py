# -----------------------------------
# imports
# -----------------------------------
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db
import models
from models import Recipe, Ingredient, DietGroup, ingredient_link, dietgroup_link, DietGroupSchema


@app.route('/recipes/', methods=["GET"])
def getRecipe():
	recipeList = db.session.query(Recipe).limit(50).all()
	response = models.schema_for_recipe.dump(recipeList)
	return jsonify(response)

@app.route('/ingredients/', methods=["GET"])
def getIngredient():
	ingredientList = db.session.query(Ingredient).limit(50).all()
	response = models.schema_for_ingredient.dump(ingredientList)
	return jsonify(response)

@app.route('/dietgroups/', methods=["GET"])
def getDietGroup():
	dietGroupList = db.session.query(DietGroup).all()
	response = models.schema_for_dietgroup.dump(dietGroupList)
	return jsonify(response)

@app.route('/recipes/<int:id>', methods=["GET"])
def getRecipeId(id):
	recipeList = db.session.query(Recipe).filter_by(id = id)
	response = models.schema_for_recipe.dump(recipeList)
	return jsonify(response)

@app.route('/ingredients/<int:id>', methods=["GET"])
def getIngredientId(id):
	ingredientList = db.session.query(Ingredient).filter_by(id = id)
	response = models.schema_for_ingredient.dump(ingredientList)
	return jsonify(response)

@app.route('/dietgroups/<int:id>', methods=["GET"])
def getDietGroupId(id):
	dietgroupList = db.session.query(DietGroup).filter_by(id = id)
	response = models.schema_for_dietgroup.dump(dietgroupList)
	return jsonify(response)

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)