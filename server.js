import express from 'express';
import dotenv from 'dotenv';
// server.js
import { testConnection } from './db.js';

import contactsRouter from './routes/contactsRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/contacts', contactsRouter);

// 🔴 Мідлвар для неіснуючих маршрутів (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// 🔴 Глобальний обробник помилок
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`✅ Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
    process.exit(1); // зупинити процес, якщо база не підключилась
  }
};

start();
