import fs from "fs/promises";
import path from "path";

export const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempPath, originalname } = req.file;
    const filename = `${req.user.id}_${originalname}`;
    const finalPath = path.resolve("public/avatars", filename);

    await fs.rename(tempPath, finalPath);

    const avatarURL = `/avatars/${filename}`;

    req.user.avatarURL = avatarURL;
    await req.user.save();

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
