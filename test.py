import unittest
import requests
import json

class unitTests(unittest.TestCase):
    API_URL = "http://dietriot.me/"

    def testAPIStatus(self):
        r = requests.get(self.API_URL)
        self.assertEqual(r.status_code, 200)

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
        # ?

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
        # ?

    def testAllDietGroupsType(self):
        r = requests.get(self.API_URL + "dietgroups")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), dict)

    def testDietGroupByIDType(self):
        r = requests.get(self.API_URL + "dietgroups/1")
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)
    
    def testDietGroupByIDValue(self):
        r = requests.get(self.API_URL + "dietgroups/2")
        self.assertEqual(r.status_code, 200)
        # ?

if __name__ == "__main__":
    unittest.main()

pass