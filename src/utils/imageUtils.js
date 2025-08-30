import sharp from 'sharp';
import { promises as fs } from 'fs';
// const path = require('path');

const compressImage = async (file, width = 800) => {
    const originalPath = file.path;
    const newPath = originalPath.replace(/\.\w+$/, '.webp');
    const tempPath = originalPath + '.temp';
  
    try {
      await sharp(originalPath)
        .resize(width)
        .webp({ quality: 80 })
        .toFile(newPath);
  
      await fs.rename(originalPath, tempPath);
  
      return { newPath, tempPath };
    } catch (error) {
      console.error(`Error processing file: ${originalPath}`, error);
      throw error;
    }
  };

  const deleteFileWithDelay = async (file, delay = 1000) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return fs.unlink(file);
  };
  

export {compressImage,deleteFileWithDelay };
