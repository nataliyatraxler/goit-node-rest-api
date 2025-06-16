import express from "express";
import contactsRouter from "./routes/contactsRouter.js"; // або contacts.js

const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
