import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3.config.js";
import { processImage } from "../config/sharp.config.js";

export const uploadFileToS3 = async (file, folder = "uploads") => {
  try {
    const processedBuffer = await processImage(file.buffer);
    const cleanName = file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-") // spasi → dash
      .replace(/[^a-zA-Z0-9-_]/g, ""); // hapus karakter aneh

    const fileName = `${Date.now()}-${cleanName}.webp`;
    const fileKey = `${folder}/${fileName}`;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
      Body: processedBuffer,
      ContentType: "image/webp",
    };

    await s3Client.send(new PutObjectCommand(params));

    const publicUrl = `${process.env.PUBLIC_URL}/${folder}/${fileName}`;

    return {
      key: fileName,
      url: publicUrl,
    };
  } catch (error) {
    throw new Error(`Upload gagal: ${error.message}`);
  }
};

export const deleteFileFromS3 = async (fileKey, folder = "uploads") => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${folder}/${fileKey}`,
    };

    await s3Client.send(new DeleteObjectCommand(params));

    return { message: "File berhasil dihapus" };
  } catch (error) {
    throw new Error(`Delete gagal: ${error.message}`);
  }
};
