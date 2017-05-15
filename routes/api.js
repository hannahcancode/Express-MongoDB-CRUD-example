var express = require('express');
var router = express.Router();

const Ingredient = require('../models/Ingredient');
const ingredientAPIController = require('../controllers/ingredientAPIController');


router.get('/', ingredientAPIController.getIngredients);
router.post('/new', ingredientAPIController.createIngredients);
router.post('/:id/edit', ingredientAPIController.editIngredients);
router.get('/:id', ingredientAPIController.getSingleIngredient);
router.delete('/:id/delete', ingredientAPIController.deleteIngredients);

module.exports = router;
