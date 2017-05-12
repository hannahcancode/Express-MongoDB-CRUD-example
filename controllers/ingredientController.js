const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIngredients = (req, res) => {
  Ingredient.find()
    .then(ingredients => {
      res.render('index', {
        title: 'Ingredients',
        ingredients: ingredients
      })
    })
};

exports.createIngredients = (req, res) => {
  const name = req.body.ingredient_name;
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(() => {
      res.redirect('/');
    })
};

exports.editIngredients = (req, res) => {
  Ingredient.findOne({ _id: req.params.id })
    .then(ingredient => {
      res.render('editIngredient', {ingredient: ingredient});
    })
};

exports.updateIngredient = (req, res) => {
  console.log('req.body', req.body);
  Ingredient.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true // returns new ingredient
  })
    .then((ingredient) => {
      res.redirect('/');
    })
};

exports.deleteIngredient = (req, res) => {
  console.log("delete");
  Ingredient.findOneAndRemove({ _id: req.params.id }, req.body )
  .then(() => {
    res.redirect('/');
  })
};
