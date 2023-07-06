#!/usr/bin/env python3

# ---------------------------
# dietriot models.py
# ---------------------------

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# initializing Flask app 
app = Flask(__name__) 
CORS(app)

app.app_context().push()

# Make these command line arguments that provide when you deploy the app
# or use other options like connecting directly from App Engine

# Change this accordingly 
USER ="yari"
PASSWORD ="tas2moon"
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="dietriot"


# Configuration 

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yari:tas2moon@localhost:5432/dietriot'
app.config['SQLALCHEMY_DATABASE_URI'] = \
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message
db = SQLAlchemy(app)
ma = Marshmallow(app)

ingredient_link = db.Table('ingredient_link',
                       db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
                       db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')))

dietgroup_link = db.Table('dietgroup_link',

                        db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
                       db.Column('dietgroup_id', db.Integer, db.ForeignKey('dietgroup.id')))
                           
class Recipe(db.Model):
    """"
    Recipe has 5 attributes
    id, for database
    yield
    cuisine type
    meal type
    prep time
    which diet groups it belongs to
    total calories
    ingredients
    link to the recipe page / could instead put the recipe instructions
    """
    __tablename__ = 'recipe'
    title = db.Column(db.String)
    id = db.Column(db.Integer, primary_key = True)
    src = db.Column(db.String)
    servings= db.Column(db.Integer)
    dishTypes = db.Column(db.String)
    calories= db.Column(db.Integer)
    recipeLink = db.Column(db.String)
    # table link
    ingredients = db.relationship('Ingredient', secondary = 'ingredient_link', backref = 'ing_link')
    dietgroups = db.relationship('DietGroup', secondary = 'dietgroup_link', backref = 'dg_link')

class Ingredient(db.Model):
    """"
    Ingredient has 5 attributes
    title
    recipes it's part of
    image (src)
    id
    aisle
    calories
    estimated cost (cents)
    """
    __tablename__ = "ingredient"
    title = db.Column(db.String)
    id = db.Column(db.Integer, primary_key = True)
    src = db.Column(db.String)
    aisle = db.Column(db.String)
    sugars = db.Column(db.Float)
    carbs = db.Column(db.Float)
    protein = db.Column(db.Float)
    calories = db.Column(db.Float)
    serving = db.Column(db.String)
    recipes = db.relationship('Recipe', secondary = 'ingredient_link', backref = 'recipe_link')



class DietGroup(db.Model):
    """"
    Recipe has 5 attributes
    title
    ingredients
    image
    id
    dg
    """
    __tablename__ = "dietgroup"
    title = db.Column(db.String)
    id = db.Column(db.Integer, primary_key = True)
    src = db.Column(db.String)
    desc = db.Column(db.String)
    prohibits = db.Column(db.String)
    percentage = db.Column(db.Float)
    membership = db.Column(db.ARRAY(db.String(10)))

    recipes = db.relationship('Recipe', secondary = 'dietgroup_link', backref = 'recipe2_link')



class IngredientSchema(ma.SQLAlchemySchema):
    class Meta:
        # Fields to expose
        fields=(
            "title",
            "id",
            "src",
            "aisle",
            "sugars",
            "carbs",
            "protein",
            "calories",
            "serving",
            "recipes"
        )
    recipes = ma.Nested(lambda: RecipeSchema(only=("id","title")), many = 20)
schema_for_ingredient = IngredientSchema(many=True)

class DietGroupSchema(ma.SQLAlchemySchema):
    class Meta:
        # Fields to expose
        fields=(
            "title",
            "id",
            "recipes",
            "src",
            "desc",
            "prohibits",
            "percentage",
            "membership"
        )
    recipes = ma.Nested(lambda: RecipeSchema(only=("id","title")), many = True)
schema_for_dietgroup = DietGroupSchema(many=True)

class RecipeSchema(ma.SQLAlchemySchema):
   
    class Meta:
        # Fields to expose
        model = Recipe
        fields=(
      
            "title",
            "id",
            "src",
            "servings",
            "dishTypes",
            "calories",
            "recipeLink",
            "ingredients",
            "dietgroups"
        )
    dietgroups = ma.Nested(lambda: DietGroupSchema(exclude=(["recipes"])), many=True)
    ingredients = ma.Nested(lambda: IngredientSchema(exclude=(["recipes"])), many=True)
schema_for_recipe = RecipeSchema(many=True)


if __name__ == "__main__":
    db.drop_all()
    db.create_all()
