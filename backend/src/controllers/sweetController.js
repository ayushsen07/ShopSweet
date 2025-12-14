const Sweet = require('../models/Sweet');

//     Create a new sweet
//    POST /api/sweets
//   Private
const createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  try {
    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//     Get all sweets
//    GET /api/sweets
//  Protected
const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find({});
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//     Search sweets
//   GET /api/sweets/search
//   Protected
const searchSweets = async (req, res) => {
  const { query } = req.query;
  try {
    const keyword = query
      ? {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const sweets = await Sweet.find({ ...keyword });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Purchase a sweet (decrease stock)
//  POST /api/sweets/:id/purchase
//   Protected
const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity > 0) {
      sweet.quantity = sweet.quantity - 1;
      const updatedSweet = await sweet.save();
      res.json(updatedSweet);
    } else {
      res.status(400).json({ message: 'Sweet is out of stock' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... existing imports and functions ...

//     Update a sweet
//    PUT /api/sweets/:id
//   Private/Admin
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      sweet.name = req.body.name || sweet.name;
      sweet.category = req.body.category || sweet.category;
      sweet.price = req.body.price || sweet.price;
      sweet.quantity = req.body.quantity || sweet.quantity;

      const updatedSweet = await sweet.save();
      res.json(updatedSweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//     Delete a sweet
//    DELETE /api/sweets/:id
//   Private/Admin
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      await sweet.deleteOne();
      res.json({ message: 'Sweet removed' });
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Restock sweet
//    POST /api/sweets/:id/restock
// Private/Admin
const restockSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      // Add incoming quantity to existing stock
      sweet.quantity += Number(req.body.quantity); 
      await sweet.save();
      res.json(sweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export ALL functions
module.exports = { 
  createSweet, 
  getSweets, 
  searchSweets, 
  purchaseSweet,
  updateSweet,
  deleteSweet,
  restockSweet
};
