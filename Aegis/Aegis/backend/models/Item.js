const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true }, // You can replace this with a user reference if you have a user model
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true }, // Email or contact number
  date: { type: Date, default: Date.now },
  image: { type: String }, // URL of the image stored in MongoDB
  status: { type: String, enum: ['lost', 'found', 'claimed'], default: 'lost' },
  comments: [CommentSchema], // Array of comments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);