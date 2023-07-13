# -----------------------------------
# imports
# -----------------------------------
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db
import models
from models import (
    Recipe,
    Ingredient,
    DietGroup,
    ingredient_link,
    ingredient_dietgroup_link,
    dietgroup_link,
)
from sqlalchemy import or_, func, cast
from sqlalchemy.sql.sqltypes import String


@app.route("/search/<string:search>", methods=["GET"])
def getSearch(search):
    if not search:
        return "Please input valid search"

    search = search.lower()

    recipeList = db.session.query(Recipe)
    ingredientList = db.session.query(Ingredient)
    dietgroupList = db.session.query(DietGroup)

    ingredient_subquery = (
        db.session.query(Recipe.id)
        .join(Recipe.ingredients)
        .filter(Ingredient.title.ilike(f"%{search}%"))
    )
    recipeList = recipeList.join(
        Ingredient,
        Recipe.ingredients,
    ).filter(
        or_(
            Recipe.id.in_(ingredient_subquery),
            func.lower(Recipe.title).contains(search),
            cast(Recipe.servings, String) == search,
            cast(Recipe.calories, String) == search,
            (Recipe.recipeLink).contains(search),
        )
    ).distinct()
    ingredientList = ingredientList.filter(
        or_(
            func.lower(Ingredient.title).contains(search),
            func.lower(Ingredient.aisle).contains(search),
            func.lower(Ingredient.aisle).contains(search),
            cast(Ingredient.calories, String) == search,
            cast(Ingredient.carbs, String) == search,
            cast(Ingredient.protein, String) == search,
            cast(Ingredient.serving, String) == search,
            cast(Ingredient.sugars, String) == search,
        )
    )
    dietgroupList = dietgroupList.filter(
        or_(
            func.lower(DietGroup.title).contains(search),
            func.lower(DietGroup.desc).contains(search),
            func.lower(DietGroup.prohibits).contains(search),
            DietGroup.membership.any(search),
            cast(DietGroup.percentage, String) == search,
        )
    )
    
    numPerPage = request.args.get("numPerPage", 5, type=int)
    
    if numPerPage == 0:
        numPerPage = 5
    
    rpage = request.args.get("r_page", 1, type=int)
    ipage = request.args.get("i_page", 1, type=int)
    dpage = request.args.get("d_page", 1, type=int)

    recipeList = recipeList.paginate(page=rpage, max_per_page=numPerPage)
    ingredientList = ingredientList.paginate(page=ipage, max_per_page=numPerPage)
    dietgroupList = dietgroupList.paginate(page=dpage, max_per_page=numPerPage)

    r_totalNumPages = recipeList.pages
    i_totalNumPages = ingredientList.pages
    d_totalNumPages = dietgroupList.pages

    result = { 
        "r_pages": r_totalNumPages,
        "i_pages": i_totalNumPages,
        "d_pages": d_totalNumPages,
        "recipes": models.schema_for_simple_recipe.dump(recipeList.items),
        "ingredients": models.schema_for_simple_ingredient.dump(ingredientList.items),
        "dietgroups": models.schema_for_simple_dietgroup.dump(dietgroupList.items),
    }
    
    return jsonify(result)


@app.route("/recipes/", methods=["GET"])
def getRecipe():
    recipeList = db.session.query(Recipe)
    dietgroup = request.args.get("dietgroup", None, type=str)
    sort = request.args.get("sort", None, type=str)
    search = request.args.get("search", None, type=str)
    """
	calories: 0, sort
	ingredients: [], sort number ingredients
	dietgroups: [], filter
	title: "", alphabetical sort
	servings: 0, sort
	"""
    if search:
        search = search.lower()
        ingredient_subquery = (
            db.session.query(Recipe.id)
            .join(Recipe.ingredients)
            .filter(Ingredient.title.ilike(f"%{search}%"))
        )
        recipeList = recipeList.join(
            Ingredient,
            Recipe.ingredients,
        ).filter(
            or_(
                Recipe.id.in_(ingredient_subquery),
                func.lower(Recipe.title).contains(search),
                cast(Recipe.servings, String) == search,
                cast(Recipe.calories, String) == search,
                (Recipe.recipeLink).contains(search),
            )
        )
        recipe_ids = [r.id for r in recipeList.all()]
        recipeList = db.session.query(Recipe).filter(Recipe.id.in_(recipe_ids))


    if dietgroup:
        subquery = (
            db.session.query(DietGroup.id)
            .filter(DietGroup.title.contains(dietgroup))
            .subquery()
        )
        recipeList = (
            recipeList.join(Recipe.dietgroups)
            .filter(DietGroup.id.in_(subquery))
        )
    if sort:
        if sort == "numIngredients":
            subquery = db.session.query(ingredient_link.c.recipe_id, func.count(ingredient_link.c.ingredient_id).label('num_ingredients')).group_by(ingredient_link.c.recipe_id).subquery()
            recipeList = recipeList.join(subquery, Recipe.id == subquery.c.recipe_id).order_by(subquery.c.num_ingredients.desc())
        if sort == "title":
            recipeList = recipeList.order_by(Recipe.title)
        if sort == "servings":
            recipeList = recipeList.order_by(Recipe.servings)
        if sort == "calories":
            recipeList = recipeList.order_by(Recipe.calories)
    
    numPerPage = request.args.get("numPerPage", 5, type=int)
    page = request.args.get("page", 1, type=int)
    	
    if numPerPage == 0:
        numPerPage = 5
    
    recipeFinal = recipeList.paginate(page=page, max_per_page=numPerPage)
        
    totalNumPages = recipeFinal.pages
    response = { 
        "pages": totalNumPages,
        "data": models.schema_for_simple_recipe.dump(recipeFinal.items),
        }
    return jsonify(response)


@app.route("/ingredients/", methods=["GET"])
def getIngredient():
    ingredientList = db.session.query(Ingredient)
    aisle = request.args.get("aisle", None, type=str)
    search = request.args.get("search", None, type=str)
    if search:
        search = search.lower()
        ingredientList = ingredientList.filter(
            or_(
                func.lower(Ingredient.title).contains(search),
                func.lower(Ingredient.aisle).contains(search),
                cast(Ingredient.calories, String) == search,
                cast(Ingredient.carbs, String) == search,
                cast(Ingredient.protein, String) == search,
                cast(Ingredient.serving, String) == search,
                cast(Ingredient.sugars, String) == search,
            )
        )

    if aisle:
        aislefilt = aisle
        ingredientList = ingredientList.filter(Ingredient.aisle.contains(aislefilt))

    sort = request.args.get("sort", None, type=str)
    if sort:
        if sort == "title":
            ingredientList = ingredientList.order_by(Ingredient.title)
        if sort == "serving":
            ingredientList = ingredientList.order_by(Ingredient.serving)
        if sort == "calories":
            ingredientList = ingredientList.order_by(Ingredient.calories)
        if sort == "protein":
            ingredientList = ingredientList.order_by(Ingredient.protein)
        if sort == "carbs":
            ingredientList = ingredientList.order_by(Ingredient.carbs)
        if sort == "sugars":
            ingredientList = ingredientList.order_by(Ingredient.sugars)
            
    page = request.args.get("page", 1, type=int)
    numPerPage = request.args.get("numPerPage", 5, type=int)
    
    if numPerPage == 0:
        numPerPage = 5
    
    ingFinal = ingredientList.paginate(page=page, max_per_page=numPerPage)
        
    totalNumPages = ingFinal.pages
    response = { 
        "pages": totalNumPages,
        "data": models.schema_for_simple_ingredient.dump(ingFinal.items),
        }

    return jsonify(response)


@app.route("/dietgroups/", methods=["GET"])
def getDietGroup():
    dietgroupList = db.session.query(DietGroup)
    membership = request.args.get("membership", None, type=str)
    sort = request.args.get("sort", None, type=str)
    search = request.args.get("search", None, type=str)
    """
	membership: [], filter
	percent: 0, sort
	numIngredients: 0, sort
	numRecipes: 0, sort
	title: "", alphabetical sort
	"""

    if search:
        search = search.lower()
        dietgroupList = dietgroupList.filter(
            or_(
                func.lower(DietGroup.title).contains(search),
                func.lower(DietGroup.desc).contains(search),
                func.lower(DietGroup.prohibits).contains(search),
                DietGroup.membership.any(search),
                cast(DietGroup.percentage, String) == search,
            )
        )

    if membership:
        dietgroupList = dietgroupList.filter(DietGroup.membership.any(membership))
    if sort:
        if sort == "numIngredients":
            subquery = db.session.query(ingredient_dietgroup_link.c.dietgroup_id, func.count(ingredient_dietgroup_link.c.ingredient_id).label('num_ingredients')).group_by(ingredient_dietgroup_link.c.dietgroup_id).subquery()
            dietgroupList = dietgroupList.join(subquery, DietGroup.id == subquery.c.dietgroup_id).order_by(subquery.c.num_ingredients)
        if sort == "numRecipes":
            subquery = db.session.query(dietgroup_link.c.dietgroup_id, func.count(dietgroup_link.c.recipe_id).label('num_recipes')).group_by(dietgroup_link.c.dietgroup_id).subquery()
            dietgroupList = dietgroupList.join(subquery, DietGroup.id == subquery.c.dietgroup_id).order_by(subquery.c.num_recipes)
        if sort == "title":
            dietgroupList = dietgroupList.order_by(DietGroup.title)
        if sort == "percentage":
            dietgroupList = dietgroupList.order_by(DietGroup.percentage)

    response = models.schema_for_simple_dietgroup.dump(dietgroupList)
    return jsonify(response)


@app.route("/recipes/<int:id>", methods=["GET"])
def getRecipeId(id):
    recipeList = db.session.query(Recipe).filter_by(id=id)
    response = models.schema_for_recipe.dump(recipeList)
    return jsonify(response)


@app.route("/ingredients/<int:id>", methods=["GET"])
def getIngredientId(id):
    ingredientList = db.session.query(Ingredient).filter_by(id=id)
    response = models.schema_for_ingredient.dump(ingredientList)
    return jsonify(response)


@app.route("/dietgroups/<int:id>", methods=["GET"])
def getDietGroupId(id):
    dietgroupList = db.session.query(DietGroup).filter_by(id=id)
    response = models.schema_for_dietgroup.dump(dietgroupList)
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
