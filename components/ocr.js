// import Tesseract.js library
import Tesseract from 'tesseract.js';

// define function that receives an image URI and returns text extracted from the image
export default async function extractTextFromImage(imageUri) {
  // load image using Tesseract.js
  const { data: { text } } = await Tesseract.recognize(imageUri);

  // return extracted text
  return text;
}
