const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET All Tags with Associated Product Data
router.get('/', async (req, res) => {
  try {
    // Query the database for all tags, including associated product data
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // Include the ProductTag model for association
        },
      ],
    });
    // Send the tags as JSON response
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET Tag by ID with Associated Product Data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Find a single tag by ID, including associated product data
    const tag = await Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
          through: ProductTag, // Include the ProductTag model for association
        },
      ],
    });

    if (!tag) {
      // If tag is not found, send a 404 response
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Send the found tag as JSON response
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST New Tag with Associated Products
router.post('/', async (req, res) => {
  try {
    // Create a new tag based on the request body
    const newTag = await Tag.create(req.body);

    // If there are product IDs in the request, associate the tag with products using ProductTag
    if (req.body.productIds && req.body.productIds.length > 0) {
      await ProductTag.bulkCreate(
        req.body.productIds.map(productId => ({
          tag_id: newTag.id,
          product_id: productId,
        }))
      );
    }

    // Send the newly created tag as JSON response
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (Update) Tag Name by ID
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Update a tag's name by ID with the data from the request body
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (updatedTag[0] === 0) {
      // If tag is not found, send a 404 response
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Send the updated tag as JSON response
    res.json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE Tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Delete a tag by ID
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });

    if (!deletedTag) {
      // If tag is not found, send a 404 response
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Send a success message in the response
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
