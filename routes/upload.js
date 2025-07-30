import express from "express";
import multer from "multer";
import { uploadToS3, generatePresignedUrl } from "../s3.js";

const upload = multer();
const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const key = await uploadToS3(req.file);
    const url = await generatePresignedUrl(key);
    res.json({ success: true, key, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

export default router;
