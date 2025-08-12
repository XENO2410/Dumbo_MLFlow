// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create a new item
router.post('/', async (req, res) => {
  const { type, title, description, category, location, contact, image } = req.body;
  const newItem = new Item({ type, title, description, category, location, contact, image });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get items by type
router.get('/', async (req, res) => {
  const { type } = req.query;
  try {
    const items = await Item.find(type ? { type } : {});
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a comment to an item
router.put('/:id/comment', async (req, res) => {
  const { user, text } = req.body; // Ensure user and text are being sent in the request body
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user, text } } }, // Push the new comment into the comments array
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;