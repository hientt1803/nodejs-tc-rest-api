import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req: express.Request, file, cb) {
    try {
      const uploadDir = path.join(__dirname, "..", "..", "storage", "uploads");
      cb(null, uploadDir);
    } catch (error) {
      console.log("upload error: ", error);
    }
  },

  filename: function (req: express.Request, file, cb) {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${file.fieldname}-${uniqueSuffix}${path.extname(
        file.originalname
      )}`;
      cb(null, fileName);
    } catch (error) {
      console.log("upload error: ", error);
    }
  },
});

export const upload = multer({ storage: storage });
