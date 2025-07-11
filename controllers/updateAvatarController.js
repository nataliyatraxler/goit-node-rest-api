import fs from "fs/promises";
import path from "path";

import { User } from "../models/index.js";

const avatarsDir = path.resolve("public", "avatars");

export const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { id } = req.user;

  const ext = path.extname(originalname);
  const filename = `${id}_${originalname}`;
  const newPath = path.join(avatarsDir, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = `/avatars/${filename}`;

  await User.update({ avatarURL }, { where: { id } });

  res.json({ avatarURL });
};
