# -----------------------------------
# imports
# -----------------------------------
from flask import render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db
import models


@app.route('/recipes/', methods=["GET"])
def getRecipe():
	
  # db.session.query(models.Recipe)
	recipeList = models.Recipe.query.all()
	response = models.schema_for_recipe.dump(recipeList)
	return jsonify(response)

  #recipeList = models.Recipe.query.filter_by(id=1)
	#response = {
	#  "recipe": models.schema_for_recipe.dump(recipeList)
  #  }
  
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)