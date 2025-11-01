import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";

// Handle PDF text extraction using OCR fallback
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    // Render page to canvas
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;

    // OCR via Tesseract.js
    const result = await Tesseract.recognize(canvas, "eng");
    return result.data.text;
  } catch (err) {
    console.error("❌ PDF OCR Error:", err);
    return "";
  }
};

// Handle Word file extraction
export const extractTextFromDocx = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (err) {
    console.error("❌ DOCX parsing error:", err);
    return "";
  }
};

// Auto-detect file type
export const extractTextFromFile = async (file: File): Promise<string> => {
  if (file.type === "application/pdf") return extractTextFromPDF(file);
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  )
    return extractTextFromDocx(file);

  return "";
};
