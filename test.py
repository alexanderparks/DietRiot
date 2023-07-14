import unittest
import requests
import json

class unitTests(unittest.TestCase):
    API_URL = "https://dietriot-392023.uc.r.appspot.com/"

    def testAllRecipesType(self):
        r = requests.get(self.API_URL + "recipes")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), dict)

    def testRecipeByIDType(self):
        r = requests.get(self.API_URL + "recipes/1")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)

    def testRecipeByIDValue(self):
        r = requests.get(self.API_URL + "recipes/2")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()[0]["calories"], 192)

    def testAllIngredientsType(self):
        r = requests.get(self.API_URL + "ingredients")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), dict)
    
    def testIngredientByIDType(self):
        r = requests.get(self.API_URL + "ingredients/1")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)

    def testIngredientByIDValue(self):
        r = requests.get(self.API_URL + "ingredients/2")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()[0]["aisle"], "Ethnic Foods")

    def testAllDietGroupsType(self):
        r = requests.get(self.API_URL + "dietgroups")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)

    def testDietGroupByIDType(self):
        r = requests.get(self.API_URL + "dietgroups/1")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)
    
    def testDietGroupByIDValue(self):
        r = requests.get(self.API_URL + "dietgroups/2")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()[0]["desc"], "A dairy-free diet excludes all dairy products. People who follow this eating pattern may still eat other animal foods like meat, fish, shellfish, and eggs. Dairy-free diets are commonly chosen for health reasons, such as a cow’s milk allergy or lactose intolerance — a condition in which your body can’t digest the milk sugar lactose, leading to diarrhea and gas after dairy is consumed (1Trusted Source, 2Trusted Source). Some people may also follow a dairy-free diet for ethical reasons.")

if __name__ == "__main__":
    unittest.main()
