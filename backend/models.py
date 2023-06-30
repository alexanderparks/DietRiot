#!/usr/bin/env python3

# ---------------------------
# dietriot models.py
# ---------------------------

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
# from flask_cors import CORS

# initializing Flask app 
app = Flask(__name__) 
# CORS(app)

app.app_context().push()

# Make these command line arguments that provide when you deploy the app
# or use other options like connecting directly from App Engine

# Change this accordingly 
USER ="yari"
PASSWORD ="tas2moon"
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="dietriot"


# Configuration 
# app.config['SQLALCHEMY_DATABASE_URI'] = \
# os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yari:tas2moon@localhost:5432/dietriot'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message
db = SQLAlchemy(app)

ingredient_link = db.Table('ingredient_link',

                       db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
                       db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')))

dietgroup_link = db.Table('dietgroup_link',

                        db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
                       db.Column('dietgroup_id', db.Integer, db.ForeignKey('dietgroup.id')))
                           
class Recipe(db.Model):
    """"
    Recipe has 5 attributes
    title
    ingredients
    image
    id
    dg
    """
    __tablename__ = 'recipe'
    title = db.Column(db.String(200), nullable = False)
    id = db.Column(db.Integer, primary_key = True)
    src = db.Column(db.String(200), nullable = False)
    # table link
    ingredients = db.relationship('Ingredient', secondary = 'ingredient_link', backref = 'ing_link')
    dietgroups = db.relationship('DietGroup', secondary = 'dietgroup_link', backref = 'dg_link')
    
class Ingredient(db.Model):
    """"
    Ingredient has 5 attributes
    title
    recipes
    image
    id
    dg
    """
    __tablename__ = "ingredient"
    title = db.Column(db.String(200), nullable = False)
    id = db.Column(db.Integer, primary_key = True)
    src = db.Column(db.String(200), nullable = False)

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
    title = db.Column(db.String(200), nullable = False)
    id = db.Column(db.Integer, primary_key = True)


db.drop_all()
db.create_all()