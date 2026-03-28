# goit-node-rest-api

Цей проєкт є REST API для керування контактами, розроблений у рамках навчального курсу GoIT.

## 🚀 Стек технологій

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Joi для валідації
- Nodemon для розробки
- dotenv для конфігурації

## 📦 Установка

```bash
git clone https://github.com/nataliyatraxler/goit-node-rest-api.git
cd goit-node-rest-api
npm install

⚙️ Налаштування
Створи .env файл у корені проєкту та додай наступне:

ini
Копировать
Редактировать
DB_HOST=localhost
DB_PORT=5432
DB_USER=твій_користувач
DB_PASSWORD=твоїй_пароль
DB_NAME=назва_бази_даних
PORT=3000
🧪 Скрипти
npm run dev — запуск у dev-режимі з nodemon

npm start — запуск у production-режимі

📬 API Ендпоїнти
GET /api/contacts — отримати всі контакти

POST /api/contacts — створити контакт

PUT /api/contacts/:id — оновити контакт

DELETE /api/contacts/:id — видалити контакт

PATCH /api/contacts/:id/favorite — оновити статус "favorite"

📁 Структура проєкту
pgsql
Копировать
Редактировать
.
├── controllers/
├── db/
├── models/
├── routes/
├── schemas/
├── services/
├── .env
├── .gitignore
├── package.json
├── server.js