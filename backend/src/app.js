const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes'); // <--- Import

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes); // <--- Mount

app.get('/', (req, res) => {
  res.send('Sweet Shop API is running...');
});

module.exports = app;