const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET All Categories with Associated Products
router.get('/', async (req, res) => {
  try {
    // Query the database for all categories, including associated products
    const categories = await Category.findAll({
      include: Product,
    });
    // Send the categories as JSON response
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET Category by ID with Associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Find a single category by ID, including associated products
    const category = await Category.findByPk(categoryId, {
      include: Product,
    });

    if (!category) {
      // If category is not found, send a 404 response
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Send the found category as JSON response
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST New Category
router.post('/', async (req, res) => {
  try {
    // Create a new category based on the request body
    const newCategory = await Category.create(req.body);
    // Send the newly created category as JSON response
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (Update) Category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Update a category by ID with the data from the request body
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      // If category is not found, send a 404 response
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Send the updated category as JSON response
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE Category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Delete a category by ID
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (!deletedCategory) {
      // If category is not found, send a 404 response
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Send a success message in the response
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
