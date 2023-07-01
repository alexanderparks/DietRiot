# -----------------------------------
# imports
# -----------------------------------
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db
import models

@app.route('/recipes/', methods=["GET"])
def getRecipe():
	recipeList = models.Recipe.query.all()
	response = models.schema_for_recipe.dump(recipeList)
	return jsonify(response)

@app.route('/ingredients/', methods=["GET"])
def getIngredient():
	ingredientList = models.Ingredient.query.all()
	response = models.schema_for_ingredient.dump(ingredientList)
	return jsonify(response)

@app.route('/dietgroups/', methods=["GET"])
def getDietGroup():
	dietGroupList = models.DietGroup.query.all()
	response = models.schema_for_dietgroup.dump(dietGroupList)
	return jsonify(response)

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)