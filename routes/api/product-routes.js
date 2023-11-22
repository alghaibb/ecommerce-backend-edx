const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET All Products with Associated Category and Tag Data
router.get('/', async (req, res) => {
  try {
    // Query the database for all products, including associated category and tag data
    const products = await Product.findAll({
      include: [Category, Tag],
    });
    // Send the products as JSON response
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET Product by ID with Associated Category and Tag Data
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Find a single product by ID, including associated category and tag data
    const product = await Product.findByPk(productId, {
      include: [Category, Tag],
    });

    if (!product) {
      // If product is not found, send a 404 response
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Send the found product as JSON response
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST New Product
router.post('/', async (req, res) => {
  try {
    // Create a new product based on the request body
    const newProduct = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      // If there are product tags, create pairings in the ProductTag model
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Send the newly created product as JSON response
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (Update) Product by ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Update a product by ID with the data from the request body
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      // If there are product tags, update the ProductTag model with new tag data
      const productTags = await ProductTag.findAll({
        where: { product_id: productId },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: productId,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    if (updatedProduct[0] === 0) {
      // If product is not found, send a 404 response
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Send the updated product as JSON response
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE Product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Delete a product by ID
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });

    if (!deletedProduct) {
      // If product is not found, send a 404 response
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Send a success message in the response
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
