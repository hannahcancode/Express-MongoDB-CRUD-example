const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIngredients = (req, res) => {
  Ingredient.find()
    .then(ingredients => {
      res.json(ingredients);
    });
}

exports.createIngredients = (req, res) => {
  const name = req.query.ingredientName;
  console.log(name);
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(ingredients => {
      res.json(ingredients);
    });
};

exports.editIngredients = (req, res) => {
  // get ingredient from params
  // get newIngredient name from query
  let name = req.query.newName;
  console.log(name);
  Ingredient.findOneAndUpdate({ _id: req.params.id }, {name: name}, {
    new: true // returns new ingredient
  })
    .then(ingredients => {
      res.json(ingredients);
    });
};

exports.deleteIngredients = (req, res) => {
  console.log("delete");
  Ingredient.findOneAndRemove({ _id: req.params.id })
  .then(() => {
    res.send("done");
  })
};
