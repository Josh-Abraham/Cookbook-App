
import json
from flask import Flask
from flask import request
from flask import jsonify
from recipe_scrapers import scrape_me
from flask_cors import CORS

# Flask Setup
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "Welcome to the backend"

@app.route('/addRecipe', methods=['POST'])
def addRecipe():
  req_data = request.get_json()
  scraper = scrape_me(req_data['recipeURL'])

  # Add recipe to list
  with open('../cookbook/src/recipes/recipeList.json') as json_file:
      data = json.load(json_file)
      data[req_data['category']].append({
          'name': scraper.title()
      })
  with open('../cookbook/src/recipes/recipeList.json', 'w') as json_file:
    json.dump(data, json_file)

  # Create recipe 
  ingredients = scraper.ingredients() 
  if 'Deselect All' in ingredients:
    ingredients.remove('Deselect All')
  ingredientsJSON = []
  for elem in ingredients:
    ingredientsJSON.append(
      {'Ingredients': elem}
    )
  
  instructions = scraper.instructions()
  instructions = instructions.split('\n')
  instructionsJSON = []
  for elem in instructions:
    instructionsJSON.append(
      {'Instructions': elem}
    )
  recipeJSON = {
    'name': scraper.title(),
    'Total Time': scraper.total_time(),
    'Yield': scraper.yields(),
    'Ingredients': ingredientsJSON,
    'Instructions': instructionsJSON,
    'ImageURL': scraper.image()
  }
  fileName = scraper.title().replace(' ', '')
  stringFile = '../cookbook/src/recipes/' + req_data['category'] + '/' + fileName + '.json'
  with open(stringFile, 'w') as json_file:
    json.dump(recipeJSON, json_file)
  
  return 'true'

@app.route('/addCustomRecipe', methods=['POST'])
def addCustomRecipe():
  req_data = request.get_json()
  with open('../cookbook/src/recipes/recipeList.json') as json_file:
      data = json.load(json_file)
      data[req_data['category']].append({
          'name': req_data['recipeName']
      })
  with open('../cookbook/src/recipes/recipeList.json', 'w') as json_file:
    json.dump(data, json_file)


  recipeJSON = {
    'name': req_data['recipeName'],
    'Total Time': req_data['prepTime'],
    'Yield': req_data['serving'],
    'Ingredients': [],
    'Instructions': [],
    'ImageURL': req_data['recipePicture']
  }

  fileName = req_data['recipeName'].replace(' ', '')
  stringFile = '../cookbook/src/recipes/' + req_data['category'] + '/' + fileName + '.json'
  with open(stringFile, 'w') as json_file:
    json.dump(recipeJSON, json_file)
  
  return 'true'

@app.route('/fetchRecipe', methods=['POST'])
def fetchRecipe():
  req_data = request.get_json()
  fileName = req_data['name'].replace(' ', '')
  stringFile = '../cookbook/src/recipes/' + req_data['category'] + '/' + fileName + '.json'
  
  # Add recipe to list
  with open(stringFile) as json_file:
      data = json.load(json_file)
  
  return data

@app.route('/updateRecipe', methods=['POST'])
def updateRecipe():
  req_data = request.get_json()
  fileName = req_data['name'].replace(' ', '')
  stringFile = '../cookbook/src/recipes/' + req_data['category'] + '/' + fileName + '.json'
  
  with open(stringFile, 'w') as json_file:
    json.dump(req_data['data'], json_file)

  return 'true'

if __name__ == "__main__":
    app.run()