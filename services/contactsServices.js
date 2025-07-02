const Contact = require("../models/contact");

// Получить все контакты
const listContacts = async () => {
  return await Contact.findAll();
};

// Получить контакт по ID
const getContactById = async (id) => {
  return await Contact.findByPk(id);
};

// Добавить контакт
const addContact = async ({ name, email, phone, favorite = false }) => {
  return await Contact.create({ name, email, phone, favorite });
};

// Удалить контакт по ID
const removeContact = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

// Обновить контакт по ID
const updateContact = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
