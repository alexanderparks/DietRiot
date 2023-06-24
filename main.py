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
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/7f4/7f4e5ebf466bb8508e2aacdfa7030524.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCICNFR6JmW0tXSk%2B8C2fi7P41mUZ3AgOzkMaYQEKEYeKtAiAijpTJ6FTnc7hT7kH2Jo76ptZA13qCrKuAj8Kwc%2FncoCq5BQgfEAAaDDE4NzAxNzE1MDk4NiIMqjP%2FcivvyjNm30WJKpYFxyJPWGZpl9aV5Tpd6ftlBQSDKGNc603tpqIzVs3Piu9TZvSf8YpuuDTeRluR%2FRFcYHm0OO7IAU781B9dC0Rg1mKJxNqi4MVf3SX4H6%2FtuN0t2Q0b7zOKQF%2Fn2YbUei7anwAVNbIDrxBgDkLDi4VHyesUMje4dYGxivWcDiRdF7in1JX29fVpayo4MZR9%2FuhcPDsdAz1eCz%2BtHUIDOmJHmGI%2FCLAf12AXrwUW7rFTJH4Sl4sKDHsvCxYxszZuSavlfeaedEJ9tZcc8%2BsoijFJdmsS%2BzvlZVNGC%2FTBTk7%2F54ngzo6DnrKqsEuEClq2JJOGKcDjnFVPm5G2T9dv8hpIr0bnGD9%2FPI8Bv%2Fa9sA6MdusCmK1I8GH6S5%2B82XeSbxJSGDGXWRtgFhCo8BPAaLNjtAm3518fbNPQ0fYhccH7A6kJzofoReEaD76Eq4QtO6NoEHm%2BgYwVjma1PoCeJ3lK5tuvm9pa9aEpDtq%2FkcxsXj0Tp42zDeMXPsMD3%2BH%2FE8AQU9xfx5fIKhVIpWTgXbfcm6MTf66w90g3EY5XwbhohkVIBQuwIks12piqkO%2Bi3keAyP7ayB%2BessBz2EILTz%2FlNVSoKX5MwxJoUfmCErjBkfe2%2FBysiJdHQmtyuhb%2ByH%2FJm0w%2FRyaW%2B1jNJ8Hc%2B%2B1a63mr%2F0U9ztk%2FwsXx6hTp6pkueU5uOpn9hqjEdsHhFj1nxjwCfIqCt26wgpbLYHS80RrygP0wJA7NHEP5JteOkO%2BMBkDxXRHWzDhmP9HQpvGvmCZlHFXrWIVwMrG%2F1R3Ah0LaJOqGzsc8OMK84ykl5ra1Vq%2F8DH7i93NXXQPuJXKZFbx9F4wk07oicCjxFZihl5S3Uk62q%2Bre7jH%2Bo3lJBhcQkhT2xgkw%2BM%2FdpAY6sgHNSics8TayQMipsnlO2kfLXGAryPjNp74wkST1Dy7P1cg7Qs%2Fr1kM6vw%2BRe0si0ZdgOgu%2F%2FAVcdAT8pqQlapswfa17qwC7WhiTk8i4BCQe0XjrsexfKoeGPCArfh5D%2BZlTxO9zVhvMncn3J7FPUmeZU%2BX%2BR2mrXEoYbOHVfry%2FdXRo6VC%2F%2FwI4PVQsnF5rNm72%2FT4gpqk%2FVR9HBYU8PgwANqrD5e69YVpTMFXD6oaFfEwx&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T230939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFKQ2N4S5P%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=249e68da34acb76b69b9ceb983002fb8d7ddf4f2373774ab75ba97e004659d11",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"40 min"
  },
  {
    "title": "Carrot and Avocado Salad",
    "ingredients": "avocado",
    "dietgroup": "halal, gluten-free, vegetarian",
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/0ed/0edf0f670be3e5ea4373261312597253.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCICNFR6JmW0tXSk%2B8C2fi7P41mUZ3AgOzkMaYQEKEYeKtAiAijpTJ6FTnc7hT7kH2Jo76ptZA13qCrKuAj8Kwc%2FncoCq5BQgfEAAaDDE4NzAxNzE1MDk4NiIMqjP%2FcivvyjNm30WJKpYFxyJPWGZpl9aV5Tpd6ftlBQSDKGNc603tpqIzVs3Piu9TZvSf8YpuuDTeRluR%2FRFcYHm0OO7IAU781B9dC0Rg1mKJxNqi4MVf3SX4H6%2FtuN0t2Q0b7zOKQF%2Fn2YbUei7anwAVNbIDrxBgDkLDi4VHyesUMje4dYGxivWcDiRdF7in1JX29fVpayo4MZR9%2FuhcPDsdAz1eCz%2BtHUIDOmJHmGI%2FCLAf12AXrwUW7rFTJH4Sl4sKDHsvCxYxszZuSavlfeaedEJ9tZcc8%2BsoijFJdmsS%2BzvlZVNGC%2FTBTk7%2F54ngzo6DnrKqsEuEClq2JJOGKcDjnFVPm5G2T9dv8hpIr0bnGD9%2FPI8Bv%2Fa9sA6MdusCmK1I8GH6S5%2B82XeSbxJSGDGXWRtgFhCo8BPAaLNjtAm3518fbNPQ0fYhccH7A6kJzofoReEaD76Eq4QtO6NoEHm%2BgYwVjma1PoCeJ3lK5tuvm9pa9aEpDtq%2FkcxsXj0Tp42zDeMXPsMD3%2BH%2FE8AQU9xfx5fIKhVIpWTgXbfcm6MTf66w90g3EY5XwbhohkVIBQuwIks12piqkO%2Bi3keAyP7ayB%2BessBz2EILTz%2FlNVSoKX5MwxJoUfmCErjBkfe2%2FBysiJdHQmtyuhb%2ByH%2FJm0w%2FRyaW%2B1jNJ8Hc%2B%2B1a63mr%2F0U9ztk%2FwsXx6hTp6pkueU5uOpn9hqjEdsHhFj1nxjwCfIqCt26wgpbLYHS80RrygP0wJA7NHEP5JteOkO%2BMBkDxXRHWzDhmP9HQpvGvmCZlHFXrWIVwMrG%2F1R3Ah0LaJOqGzsc8OMK84ykl5ra1Vq%2F8DH7i93NXXQPuJXKZFbx9F4wk07oicCjxFZihl5S3Uk62q%2Bre7jH%2Bo3lJBhcQkhT2xgkw%2BM%2FdpAY6sgHNSics8TayQMipsnlO2kfLXGAryPjNp74wkST1Dy7P1cg7Qs%2Fr1kM6vw%2BRe0si0ZdgOgu%2F%2FAVcdAT8pqQlapswfa17qwC7WhiTk8i4BCQe0XjrsexfKoeGPCArfh5D%2BZlTxO9zVhvMncn3J7FPUmeZU%2BX%2BR2mrXEoYbOHVfry%2FdXRo6VC%2F%2FwI4PVQsnF5rNm72%2FT4gpqk%2FVR9HBYU8PgwANqrD5e69YVpTMFXD6oaFfEwx&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T231006Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKQ2N4S5P%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2587bcc9bd738eda337bf965285d5c36d0c842e43b897a291b580aa2922ae18e",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"30 min"
  },
  {
   "title": "Kale Pizza",
    "ingredients": "olive oil",
    "dietgroup": "halal",
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/7c6/7c658e6e3349a4541ee8b88d616fd953.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCICNFR6JmW0tXSk%2B8C2fi7P41mUZ3AgOzkMaYQEKEYeKtAiAijpTJ6FTnc7hT7kH2Jo76ptZA13qCrKuAj8Kwc%2FncoCq5BQgfEAAaDDE4NzAxNzE1MDk4NiIMqjP%2FcivvyjNm30WJKpYFxyJPWGZpl9aV5Tpd6ftlBQSDKGNc603tpqIzVs3Piu9TZvSf8YpuuDTeRluR%2FRFcYHm0OO7IAU781B9dC0Rg1mKJxNqi4MVf3SX4H6%2FtuN0t2Q0b7zOKQF%2Fn2YbUei7anwAVNbIDrxBgDkLDi4VHyesUMje4dYGxivWcDiRdF7in1JX29fVpayo4MZR9%2FuhcPDsdAz1eCz%2BtHUIDOmJHmGI%2FCLAf12AXrwUW7rFTJH4Sl4sKDHsvCxYxszZuSavlfeaedEJ9tZcc8%2BsoijFJdmsS%2BzvlZVNGC%2FTBTk7%2F54ngzo6DnrKqsEuEClq2JJOGKcDjnFVPm5G2T9dv8hpIr0bnGD9%2FPI8Bv%2Fa9sA6MdusCmK1I8GH6S5%2B82XeSbxJSGDGXWRtgFhCo8BPAaLNjtAm3518fbNPQ0fYhccH7A6kJzofoReEaD76Eq4QtO6NoEHm%2BgYwVjma1PoCeJ3lK5tuvm9pa9aEpDtq%2FkcxsXj0Tp42zDeMXPsMD3%2BH%2FE8AQU9xfx5fIKhVIpWTgXbfcm6MTf66w90g3EY5XwbhohkVIBQuwIks12piqkO%2Bi3keAyP7ayB%2BessBz2EILTz%2FlNVSoKX5MwxJoUfmCErjBkfe2%2FBysiJdHQmtyuhb%2ByH%2FJm0w%2FRyaW%2B1jNJ8Hc%2B%2B1a63mr%2F0U9ztk%2FwsXx6hTp6pkueU5uOpn9hqjEdsHhFj1nxjwCfIqCt26wgpbLYHS80RrygP0wJA7NHEP5JteOkO%2BMBkDxXRHWzDhmP9HQpvGvmCZlHFXrWIVwMrG%2F1R3Ah0LaJOqGzsc8OMK84ykl5ra1Vq%2F8DH7i93NXXQPuJXKZFbx9F4wk07oicCjxFZihl5S3Uk62q%2Bre7jH%2Bo3lJBhcQkhT2xgkw%2BM%2FdpAY6sgHNSics8TayQMipsnlO2kfLXGAryPjNp74wkST1Dy7P1cg7Qs%2Fr1kM6vw%2BRe0si0ZdgOgu%2F%2FAVcdAT8pqQlapswfa17qwC7WhiTk8i4BCQe0XjrsexfKoeGPCArfh5D%2BZlTxO9zVhvMncn3J7FPUmeZU%2BX%2BR2mrXEoYbOHVfry%2FdXRo6VC%2F%2FwI4PVQsnF5rNm72%2FT4gpqk%2FVR9HBYU8PgwANqrD5e69YVpTMFXD6oaFfEwx&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T231029Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKQ2N4S5P%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7c604bcba88360c95c15cb69972adcba4b5784b5ca767f8ba238e2be5a38c899",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"15 min"
  },
]
ingredients=[
	  {"title":"Avocado",
	  "image":"https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg"
	  },
	  {"title":"Turkey",
	  "image":"https://pngimg.com/d/turkey_food_PNG18.png"
	  },
	  {"title":"Olive Oil",
	  "image":"https://images.heb.com/is/image/HEBGrocery/000972208-1"
	  },
  ]

dietgroups=[
	  {"title":"Halal",
	  "image":"https://static.trip101.com/paragraph_media/pictures/001/595/541/large/pexels-photo-958545.jpeg?1553522832",
	  "desc":"Includes food prepared and handled according to Sharia law, excludes pork and alcohol."
	  },
	  {"title":"Vegetarian",
	  "image":"https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg",
	  "desc":"Includes food derived from plant sources, excludes meat, poulty, and seafood."
	  },
	  {"title":"Gluten-free",
	  "image":"https://www.restaurantware.com/media/magefan_blog/gluten_free_article_-_Thumbnail.png",
	 "desc":"Excludes grain products containing gluten such as bread, pasta, and tortillas."
	 },       
  ]

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
	return render_template('diet-groups.html', dietgroups=dietgroups)

@app.route('/recipes/')
def show_recipes():
	return render_template('recipes.html',recipes=recipes)

@app.route('/recipes/<string:name>/')
def show_ingredient_instance(name):
	for r in recipes:
		if r["title"] == name:
			return render_template('recipe-instance.html', recipe = r)
	return name + " recipe not found"

@app.route('/ingredients/')
def show_ingredients():
	return render_template('ingredients.html', ingredients=ingredients)

# debug=True to avoid restart the local development server manually after each change to your code. 
# host='0.0.0.0' to make the server publicly available. 
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')