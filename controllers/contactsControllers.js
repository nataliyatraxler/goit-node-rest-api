import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) throw new HttpError(404, "Not found");
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) throw new HttpError(404, "Not found");

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) throw new HttpError(404, "Not found");

    await contact.destroy();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) throw new HttpError(404, "Not found");

    contact.favorite = favorite;
    await contact.save();

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
