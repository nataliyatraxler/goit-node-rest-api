import express from 'express';
import { testDbConnection } from './db.js'; // 👈 імпорт
import contactsRouter from './routes/contactsRouter.js';

const app = express();
app.use(express.json());

app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await testDbConnection(); // 👈 виклик функції
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start(); // 👈 запуск
