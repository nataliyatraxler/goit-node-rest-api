import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

// GET /api/contacts
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// GET /api/contacts/:id
export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    await contact.destroy();
    res.json(contact);

  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const newContact = await Contact.create({ name, email, phone, favorite });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// PUT /api/contacts/:id
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/contacts/:id/favorite
export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }

    contact.favorite = favorite;
    await contact.save();

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
