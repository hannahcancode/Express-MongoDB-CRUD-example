var express = require('express');
var router = express.Router();

const Ingredient = require('../models/Ingredient');
const ingredientController = require('../controllers/ingredientController');

/* GET home page. */
router.get('/', ingredientController.getIngredients);
router.post('/', ingredientController.createIngredients);
router.get('/ingredients/:id/edit', ingredientController.editIngredients);
router.post('/ingredients/:id/edit', ingredientController.updateIngredient);
router.delete('/ingredients/:id/remove', ingredientController.deleteIngredient);

module.exports = router;
