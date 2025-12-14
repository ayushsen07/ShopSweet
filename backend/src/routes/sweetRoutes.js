const express = require('express');
const router = express.Router();
const { 
  createSweet, 
  getSweets, 
  searchSweets, 
  purchaseSweet,
  updateSweet,
  deleteSweet,
  restockSweet
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/search', protect, searchSweets);
router.get('/', protect, getSweets);
router.post('/', protect, admin, createSweet); // Only Admin should add
router.post('/:id/purchase', protect, purchaseSweet);

// Admin Routes
router.delete('/:id', protect, admin, deleteSweet);
router.put('/:id', protect, admin, updateSweet);
router.post('/:id/restock', protect, admin, restockSweet);

module.exports = router;