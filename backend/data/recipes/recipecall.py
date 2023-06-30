import requests
import json


api_url = "https://api.spoonacular.com/recipes/complexSearch"

params = {
    "apiKey": "868050a2415a4810a15ee606853dc36f",
    "addRecipeInformation": "true",
    "addRecipeNutrition": "true",
    "number": "100",
    "offset": 0,
}

response = requests.get(url=api_url, params=params)
with open("recipedata0.json", "w") as outfile:
    outfile.write(response.text)
