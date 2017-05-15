const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIngredients = (req, res) => {
  Ingredient.find()
    .then(ingredients => {
      res.json(ingredients);
    });
}

exports.getSingleIngredient = (req, res) => {
  Ingredient.findOne({_id: req.params.id})
    .then(ingredient => {
      res.json(ingredient);
    });
}

exports.createIngredients = (req, res) => {
  const name = req.query.ingredientName;
  console.log(name);
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(() => {
      res.redirect('/api/');
    });
};

exports.editIngredients = (req, res) => {
  let name = req.query.newName;
  console.log(name);
  Ingredient.findOneAndUpdate({ _id: req.params.id }, {name: name}, {
    new: true // returns new ingredient
  })
  .then(() => {
    res.redirect(`/api/${req.params.id}`);
  });
};

exports.deleteIngredients = (req, res) => {
  Ingredient.findOneAndRemove({ _id: req.params.id })
  .then(() => {
    res.redirect('/api/');
  });
};
