import requests
import json


api_url = "https://api.spoonacular.com/recipes/complexSearch"

params = {
    "apiKey": "868050a2415a4810a15ee606853dc36f",
    "addRecipeInformation": "true",
    "fillIngredients": "true",
    "number": "100",
    "offset": 900,
}

response = requests.get(url=api_url, params=params)
with open("foodstats10.json", "w") as outfile:
    outfile.write(response.text)
