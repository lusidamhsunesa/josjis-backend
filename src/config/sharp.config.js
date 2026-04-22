import sharp from "sharp";

export const processImage = async (fileBuffer) => {
  let quality = process.env.IMAGE_QUALITY
    ? parseInt(process.env.IMAGE_QUALITY)
    : 80;
  let output;

  do {
    output = await sharp(fileBuffer).webp({ quality }).toBuffer();

    quality -= 10;
  } while (output.length > process.env.IMAGE_MAX_SIZE * 1024 && quality > 10);

  return output;
};
