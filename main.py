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
    "ingredients": [
          "1 pound ground turkey meat, preferably dark meat",
          "Kosher salt and freshly ground black pepper",
          "1 cup loosely packed cilantro leaves and fine stems, roughly chopped",
          "3 medium cloves garlic, minced or grated with a Microplane",
          "1 1/2 tablespoons extra-virgin olive oil",
          "2 ripe Hass avocados, pitted",
          "1 teaspoon ground cumin",
          "Pinch of dried red chili flakes",
          "1 tablespoon fresh juice from 1 lemon",
          "4 leaves Boston lettuce",
          "Sprouts, such as radish sprouts, for garnish",
          "4 burger buns, toasted"
        ],
    "dietgroup": ["Dairy-Free",
          "Egg-Free",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Soy-Free",
          "Fish-Free",
          "Shellfish-Free",
          "Pork-Free",
          "Crustacean-Free",
          "Celery-Free",
          "Mustard-Free",
          "Sesame-Free",
          "Lupine-Free",
          "Mollusk-Free",
          "Alcohol-Free",
          "Sulfite-Free",
          "Kosher"],
    "image":"https://www.seriouseats.com/thmb/HM36ntDqT93JZqJTh2zdCFqygQg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__05__20140530-one-pot-wonders-turkey-burgers-0daef55b338944afa44a4887a7529d0d.jpg",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"40 min",
	"yield":"8",
	"url":"https://www.seriouseats.com/turkey-burgers-avocado-mash-recipe",
	"calories":"1918.9941059839855"
  },
  {
    "title": "Carrot and Avocado Salad",
    "ingredients": [
          "2 pounds small carrots (3 to 4 inches, ½ inch thick), or large carrots quartered and cut into 3-inch segments, peeled (about 4 cups)",
          "Kosher salt",
          "1 orange",
          "1 lemon",
          "1 teaspoon cumin seeds",
          "2 medium garlic cloves",
          "1 tablespoon fresh thyme leaves",
          "1/2 cup extra-virgin olive oil",
          "1 teaspoon red wine vinegar",
          "1 teaspoon red pepper flakes",
          "Freshly ground black pepper",
          "1 tablespoon sugar",
          "1 avocado, cut into 12 wedges",
          "2 cups mixed baby sprouts, herbs, and microgreens",
          "4 tablespoons crème fraiche",
          "2 tablespoons toasted sunflower seeds",
          "2 teaspoons toasted sesame seeds"],
    "dietgroup": ["Vegetarian",
          "Pescatarian",
          "Gluten-Free",
          "Wheat-Free",
          "Egg-Free",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Soy-Free",
          "Fish-Free",
          "Shellfish-Free",
          "Pork-Free",
          "Red-Meat-Free",
          "Crustacean-Free",
          "Celery-Free",
          "Mustard-Free",
          "Lupine-Free",
          "Mollusk-Free",
          "Alcohol-Free",
          "Kosher"],
    "image":"https://images.food52.com/ojYYwmMw_QcDyajP06dGLk_94X4=/1930x1286/filters:format(webp)/4932babe-6786-4653-bfdb-872c171a72bd--food52_10-25-11-3782.jpg",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"30 min",
	"yield":"7",
	"calories":"2245.0823183697285",
	"url":"https://food52.com/recipes/15021-carrot-avocado-salad?preview=true"
  },
  {
   "title": "Kale Pizza",
    "ingredients": [
          "1 pound homemade or store-bought pizza dough, divided into two 8 ounce balls",
          "6 to 8 ounces roughly chopped trimmed kale leaves (about 2 quarts)",
          "3 tablespoons extra-virgin olive oil",
          "Kosher salt and freshly ground black pepper",
          "6 ounces shredded Fontina, Jack, or Gruyère cheese",
          "8 ounces fresh mozzarella cheese",
          "6 medium garlic cloves, thinly sliced",
          "Pinch red pepper flakes"
        ],
    "dietgroup": ["Sugar-Conscious",
          "Vegetarian",
          "Pescatarian",
          "Mediterranean",
          "Egg-Free",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Soy-Free",
          "Fish-Free",
          "Shellfish-Free",
          "Pork-Free",
          "Red-Meat-Free",
          "Crustacean-Free",
          "Celery-Free",
          "Mustard-Free",
          "Sesame-Free",
          "Lupine-Free",
          "Mollusk-Free",
          "Alcohol-Free",
          "Sulfite-Free",
          "Kosher"],
    "image":"https://www.seriouseats.com/thmb/3wUBeoEFIhxDlbMJdWi5ppZz4Pk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__10__20141022-kale-pizza-7-3330b9fddcc04989ac7492cd28f16da7.jpg",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"15 min",
	"yield":"4",
	"url":"https://www.seriouseats.com/kale-pizza-garlic-gruyere-fontina-mozzarella-recipe",
	"calories":"3108.4733328350744"
  },
]
ingredients=[
	  {"title":"Avocado",
	  "image":"https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg",
	  "recipes":["Avocado Turkey Burger", "Carrot and Avocado Salad"]
	  },
	  {"title":"Turkey",
	  "image":"https://pngimg.com/d/turkey_food_PNG18.png",
	  "recipes":["Avocado Turkey Burger"]
	  },
	  {"title":"Olive Oil",
	  "image":"https://images.heb.com/is/image/HEBGrocery/000972208-1",
	  "recipes":["Carrot and Avocado Salad", "Kale Pizza"]
	  },
  ]

dietgroups=[
	  {"title":"Halal",
	  "image":"https://static.trip101.com/paragraph_media/pictures/001/595/541/large/pexels-photo-958545.jpeg?1553522832",
	  "desc":"Includes food prepared and handled according to Sharia law, excludes pork and alcohol.",
	  "recipes":["Avocado Turkey Burger", "Carrot and Avocado Salad", "Kale Pizza"]
	  },
	  {"title":"Vegetarian",
	  "image":"https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg",
	  "desc":"Includes food derived from plant sources, excludes meat, poultry, and seafood.",
	  "recipes":["Carrot and Avocado Salad", "Kale Pizza"]
	  },
	  {"title":"Gluten-free",
	  "image":"https://www.restaurantware.com/media/magefan_blog/gluten_free_article_-_Thumbnail.png",
	 "desc":"Excludes grain products containing gluten such as bread, pasta, and tortillas.",
	 "recipes":["Carrot and Avocado Salad"]
	 },       
  ]

# ------------
# index
# ------------
@app.route('/')
def show_splash():
	return render_template('index.html')

# ------------
# pages
# ------------	
@app.route('/about-us/')
def show_about_us():
	return render_template('about-us.html')

@app.route('/diet-groups/')
def show_diet_groups():
	return render_template('diet-groups.html', dietgroups=dietgroups)

@app.route('/diet-groups/<string:name>/')
def show_diet_groups_instance(name):
	for d in dietgroups:
		if d["title"].lower() == name.lower():
			return render_template('dg-instance.html', diet = d)
	return name + " diet group not found"

@app.route('/recipes/')
def show_recipes():
	return render_template('recipes.html',recipes=recipes)

@app.route('/recipes/<string:name>/')
def show_recipe_instance(name):
	for r in recipes:
		if r["title"].lower() == name.lower():
			return render_template('recipe-instance.html', recipe = r)
	return name + " recipe not found"

@app.route('/ingredients/')
def show_ingredients():
	return render_template('ingredients.html', ingredients=ingredients)

@app.route('/ingredients/<string:name>/')
def show_ingredient_instance(name):
	for i in ingredients:
		if i["title"].lower() == name.lower():
			return render_template('ingredients-instance.html', ingredient = i)
	return name + " ingredient not found"

# debug=True to avoid restart the local development server manually after each change to your code. 
# host='0.0.0.0' to make the server publicly available. 
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')