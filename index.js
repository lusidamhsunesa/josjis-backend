const express = require('express');
const app = express();
const port = 3000;

// Import Central Router
const apiRoutes = require('./routes/index');

// Middleware
app.use(express.json());

// Menggunakan Central Router dengan prefix /api
app.use('/api', apiRoutes);

// Route Fallback
app.get('/', (req, res) => {
  res.send('API POS Sistem Berjalan Sempurna!');
});

// Jalankan Server
app.listen(port, () => {
  console.log(`✅ Server nyala di http://localhost:${port}`);
});