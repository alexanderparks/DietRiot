#!/usr/bin/env python3

# -----------------------------------
# projects/IDB3/cs373-idb-gcp/main.py
# Fares Fraij
# -----------------------------------

from flask import Flask, render_template

app = Flask(__name__)

recipes = [
  {
    "title": "Avocado Turkey Burger",
    "ingredients": "avocado, turkey",
    "dietgroup": "halal",
  },
  {
    "title": "Carrot and Avocado Salad",
    "ingredients": "avocado",
    "dietgroup": "halal, gluten-free, vegetarian",
  },
  {
   "title": "Kale Pizza",
    "ingredients": "olive oil",
    "dietgroup": "halal",
  },
];
# ------------
# index
# ------------
@app.route('/')
def show_splash():
	return render_template('index.html')

# ------------
# book
# ------------	
@app.route('/about-us/')
def show_about_us():
	return render_template('about-us.html')

@app.route('/diet-groups/')
def show_diet_groups():
	return render_template('diet-groups.html')

@app.route('/recipes/')
def show_recipes():
	return render_template('recipes.html')

@app.route('/ingredients/')
def show_ingredients():
	return render_template('ingredients.html')

# debug=True to avoid restart the local development server manually after each change to your code. 
# host='0.0.0.0' to make the server publicly available. 
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')