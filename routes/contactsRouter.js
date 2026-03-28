import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.post("/", validateBody(addContactSchema), createContact);
contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);
contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), updateStatusContact);
contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
