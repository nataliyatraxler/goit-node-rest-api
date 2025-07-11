import HttpError from "../helpers/HttpError.js";
import { User, Contact } from "../db/index.js";

// Отримати всі контакти користувача з пагінацією та фільтрацією
export const getAllContacts = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { page = 1, limit = 20, favorite } = req.query;

    const offset = (page - 1) * limit;
    const filter = { owner };

    if (favorite !== undefined) {
      filter.favorite = favorite === "true"; // "true" → true
    }

    const contacts = await Contact.findAll({
      where: filter,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// Отримати один контакт користувача
export const getOneContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { id } = req.params;

    const contact = await Contact.findOne({ where: { id, owner } });

    if (!contact) throw new HttpError(404, "Not found");

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Створити новий контакт
export const createContact = async (req, res, next) => {
  try {
    const owner = req.user.id;

    const newContact = await Contact.create({
      ...req.body,
      owner,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// Оновити контакт
export const updateContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { id } = req.params;

    const contact = await Contact.findOne({ where: { id, owner } });

    if (!contact) throw new HttpError(404, "Not found");

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Видалити контакт
export const deleteContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { id } = req.params;

    const contact = await Contact.findOne({ where: { id, owner } });

    if (!contact) throw new HttpError(404, "Not found");

    await contact.destroy();
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

// Оновити статус "favorite"
export const updateStatusContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findOne({ where: { id, owner } });

    if (!contact) throw new HttpError(404, "Not found");

    contact.favorite = favorite;
    await contact.save();

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
