import Tesseract from "tesseract.js";

/**
 * Reads text content from an uploaded image or PDF (converted to image).
 * @param file Image or scanned PDF file
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  try {
    const imageUrl = URL.createObjectURL(file);

    const result = await Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log("🔍 OCR Progress:", m),
    });

    URL.revokeObjectURL(imageUrl);
    console.log("✅ OCR Result:", result.data.text);
    return result.data.text;
  } catch (err) {
    console.error("❌ OCR Error:", err);
    return "";
  }
};
