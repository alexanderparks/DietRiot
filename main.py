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
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/d5d/d5d406c4bd6862f8b6481d1e0c9ab33f.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDet9CsxfiaZko1iOcY3R5mfz%2BE%2BEIcgNEIrMqnTlaBQwIgR%2BlQImwETBiYG2WEjvBzfjwRM7UyRrIMgYSfgrvimuoquQUIGRAAGgwxODcwMTcxNTA5ODYiDAZDXTOmyj84093PdiqWBeuCxV%2FIbNyGY8IPSk6CpokWk9qJtWEVOJ3joOI3yBVV8RYdgn3j%2BJa3LOuAOwNOmBB%2FKmF%2FViKxlZ0PpdRnQL1WFf7dE96xmAfVLvE90BjbaQry3AMuWhaiQVH%2B7an6RlFVx1SCntJenNDvZbSSUAXYSjC1yeeiVaEi99m7NuzXzH76Nfne9ss%2BI%2FxXgZkrky%2F5byM3vgaXCkPmd%2FLRc%2BV7M61n3eumUgyy1TW3ypoWqzdvhMRWIj%2BZ6U9Ax2oPPy4c7OR5PXy5%2BIpJ0EKq5Lt%2BBHqR7f%2Fd3QDXWh7Eaqxut9ielZ2g%2F%2FSoH7oRUuiCUu8jkacucl4pES3bBPEv3f8tpU7VUO5t%2BULjteBQ3KuW3Qdn5D8gv0gpJlW84d9SqRWN%2B8tMEytoWrfHv%2BYViAQdwHSTkxQm4mAN97EXlmKIalASCxyf6bkfKjwt%2B%2BnEUrJ7ZKg8JawACbnMAX2Le2DraCHVejSgkyR8vRmDfQne%2FSpV7mn1kE7n21ee8s2QJTo2UNudGmiRtbi3i%2BfjjFM1UCefML%2BL%2FCjeqfp08Gj9XowefdydvK0UraeyEszX%2Fkj%2FWFqiKCrqIgjeCO8IaI64rBWieyScnphHXSWcIrE953UvNdKqIAiaADSAAOurg%2FueS5qPaKc98RNAJbyH2YA3W6AKJyl3XYVobW5LQMpksQ5MgVS%2BKqUYzmAKylv2oe3LTaWdRkDpjMivk%2FNFV45or0%2Bl1GtNIW7qTK10Xfxw14polqGeLu4zZxrBco4SZYEH7%2Fh73EjJdTslsgrAVOSXTsyuvNffeG%2BSJ4eXlGfsv7%2BNkVy6qAOhj1frpDQLKZxIqBj7QFu%2B27Sp2VLFIWovoryCPOXznbGuMPTkYoCTORx8rz7sMLia3KQGOrEBCwEYRtVHy%2BttOKC%2FdoQyzERWzxCQBTIMLKMjPEIzU3DAXNGJ6ZSoYYtvq6MRLkrUEibcTc0G9BK0lGo1XxKhkTrNg7GF1xXIPdCqiYAYk%2FyniRfhxu9q1mhcI49nDETOYFbcgDqsQaUOwodHt7qIjz1j0olshZycQ4wgh7A89TouiDvvqW8nv4fKTZG4XOidHXwIYFYHHytfAB3ANZcsA90u1hHtrv32reEEi%2BEZ70hl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T163750Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFEGUIR4CJ%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bf6a6219391a1057261c50582040523631f33488612f1f771ddda72d66b2738f",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"40 min"
  },
  {
    "title": "Carrot and Avocado Salad",
    "ingredients": "avocado",
    "dietgroup": "halal, gluten-free, vegetarian",
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/830/8300a21899a22a5030b822de5a698f8f.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQC9S5wvf8Y1xZuOyfjYq%2FE62VKEadcteyHcBv14%2BgMsBQIhAKx8LT%2BdnRSVTFQYk1et9vL8ylBqVfCb8rt272j46gbOKrkFCBsQABoMMTg3MDE3MTUwOTg2IgzU%2BOOY7YA8hraHt%2BsqlgVWqy874IXhWrcEDZiOJLXmAHnoLo78IWscddQ%2F3%2FoVD96vGs5HDNRcWD26pmzHH05nIVzWbboJbk0H5kqbPWsTU5Wtp47KDeFv5%2Bl6Zsv5zpxsv2nwOZU8plql2gx43Kjg3tZh4IRjpXxhbix2BQtGf9ygsaogw3vYjPrrpbt8MV6eW09bEpncd4FwaHKAUDiXbwVfgsRMBSmWxQU9K568gw9AtOLkctRmnnEi8Op5R4KuQ%2BIId%2Fi1WhDgAJWPzHM3m9Gxwu%2BaQfdAQ%2F3e15tdKx6vUOEq7foq597x8DNT4g32rKs21XqaXnAfcDY3Llz34xDEZ%2BMdiy0hrEvsYmyreSAgZDqTrWYtoBo1zWBrIaVYhFptRrfTRlVGZ0hhBL81OinXlAS8gevRSX9bUoT6I7lQY6Rz07A4DmVr0WxauIYZbRxEETV8JJIR5tgxiIXe%2FEg%2BrduTDeCgL0zwR8XqaHPyg%2Bt8OJsEIiYnbeq7WP2yHqL65ZPaz%2Fm3V1DcsXQ1TvX8yrPGLewc3ipF457YVFeYr%2FXss1z9yCapxgkF9gPwi3OcYxVGo1TgJBFPk6yrSjoDi12tVTPH4IdQwFZ2WELL5G3e%2B2pYAujJf9bAWSkuhIO7osnZH4wj%2FYUBmz8Qxntuj100bC6gVbRg8znzRSCN4yvoet%2Bx6xxMinawVN%2B3DkZKq6ML7m%2BTDWmRnCpqDmlzrGA5WgCPuBr1mb1TwWqX1DFtKYy1vmB9Di3nMReRyNue%2Be2t3oU7i7xhZUpXV6RaMWv9UF8ll3Z%2BQpqDfP2oIYyq07Fuj35HLPkxC8T6bnAcDrMMS9aT0zm%2BBl7%2Bi6iORcogSfbDz%2Bmu6W2Zw3LpCJe9YNMgHphdsWvFT7BQDpgDhTCh4tykBjqwAawSz9wrCdC3CY9wA7euALKZcyObwXQn28ZeL%2FHDqBfguoYm7heYZThno8HobHNTgaw8ANL%2BGJmF98B621iCRpMjbfCrJRht61Ga%2B7CzSZIs8eoCkEuOH68rjF7S3KF73b%2BZiOknu0ENZ%2B4OYpZdHBt%2FjT4tvYE5dAJDvuK3NNeDqaiXeQRdk5tjX1bt%2BGVuM8yxXaocF0IsIKCNOOJsv5dshN%2B9LfbJsqOzSsszm5RN&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T191327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFNR4Q7QEP%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e6233e056efedfd83e9a613493794e0607cfba87a3f401389e05b6be3fce9684",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"30 min"
  },
  {
   "title": "Kale Pizza",
    "ingredients": "olive oil",
    "dietgroup": "halal",
    "image":"https://edamam-product-images.s3.amazonaws.com/web-img/7c6/7c658e6e3349a4541ee8b88d616fd953.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGTwVBtw8hGaPPstLaHN81%2FCY9Yu%2Fzmnu3UfwRSTFdklAiAbGYICIRr8oDgSdGYU7hjiB1dyyyjho2TUjRp1hLjCEyq5BQgYEAAaDDE4NzAxNzE1MDk4NiIMaYpUGo%2F4ZysBUwMMKpYFQjYqARqk%2Bovb%2FW4oiYv7nGo5tSQUexM7TJYCIjsQMJizFF14GCy9m%2BcHlRkNKSvVZjCRnXZtp8YpfkUG%2FZEeEczHKfTpFu4g4diitrvaM8bXpsLhO7AqGHYKq44oSgvj5ofqcNpxWX%2FAphqHq4vCRXcQkV4O%2Bj5%2FbReQr1Ajf5Vv%2FY23y%2BqpcTDu6vR%2BFrTy7yvmeF5I3Iux7%2FiXZRUWd6biSuS5fkjbhoMhaBeBo1LutzmSuG6WiJJ5lxhaLfqsgp5n8hSoZDS2U58QVvwOOl9sCHkCSswbMlPXlU5TL66JvNgUN9%2BPg6gHbSXS%2FpqUqaLA%2BrvCmdPXLh3abMxrbmpN2OZzqL7NLWvnIwlmXUkKM2tdgU4be1VszjHfOfhX6f8Xnz%2FzcgWIiy4gF51NvMRlK%2F0HhKuFskgsOavK%2BAfpfxSC4Yx6e1k8T6xVZB6FJmR4aURuPIqA1iykriJ1SPPfmNSyQoK3t9DLtLd44wvKz9%2F1f9v%2Fr%2FzawuLOXPGTN73577apaYS6HzFD4xazqJScRPUk8TVusxZhmXMHpVaN%2BnYt4k8C%2F%2B%2BjbWGJbqJ2NeOkFp1R3%2Fzk%2F5kMmadFGLXRdgliZB1PniAm%2F8zJDS2tnGcx%2BU8SSXOMhCpIFdwqOyqsPd7kgiUHQtc%2BUlMejt6AmOdPKjYw7dhWtCRsPj8%2FeUEY6gulbo%2FK%2BaWn%2BnN4%2Bj6VJVebx3%2BZvoiuD7NB%2FErAP6wO2w6gUgDZW1I3dkFUtPvCiDp2crQBGSX4HcDEwCfkBMrKkFb7QZnfcQjsPvjAm4GgYTof2YD%2BIIZPpNVn5wRn84yjENGIbEHDls7M0LhFHPCPDGFPWM0cIBaDTXDVOPVVuBh0USrJaotkm2A5rDn8NU0wyo3cpAY6sgFhC4i0CiMejNAcgxeDpnuV4mFIr%2FzuGgP7t8N1aX%2FAqQ3NNAg3zSTlq%2FVD0%2BoHCFLyyMyX4uCRVa7ENdAq%2FhrV4hUyYvK5XWsb1NbpenQQCYSmJPoX8QPAciw%2Bmpjy29pev%2BtfYHFYDvtfPoMY8Xe8hCXSgI%2FUo4MHtb6XVsgdDPEDRDq3aTQz0HBI0yNN7DmG0zPuG8t27AGooBYcrLbJgw1kWV1UO9Z4Qg3k%2BRikPyHu&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230624T163826Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFOEY3YGYJ%2F20230624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=68f93a6c88e80c9801a4f886aa2e758efdb9cf64a9ace8666b1ec7c8da026cb3",
	"cuisinetype": "American",
	"mealtype": "lunch/dinner",
	"time":"15 min"
  },
];
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