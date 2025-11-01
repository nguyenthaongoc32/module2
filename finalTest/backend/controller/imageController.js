import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ ok: false, message: "No images uploaded" });
    }

    const uploadPromises = req.files.map(async (file) => {
      const buffer = await sharp(file.buffer)
        .resize({ width: 700, height: 418 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "cars", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.json({ ok: true, urls });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ ok: false, message: "Error uploading images" });
  }
};

export default uploadImage;
