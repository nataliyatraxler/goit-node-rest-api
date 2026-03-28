const Contact = require("../models/contact");


const listContacts = async () => {
  return await Contact.findAll();
};

const getContactById = async (id) => {
  return await Contact.findByPk(id);
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  return await Contact.create({ name, email, phone, favorite });
};


const removeContact = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};


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
