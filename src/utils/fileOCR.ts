import Tesseract from "tesseract.js";
import pdfjsLib from "./pdfConfig";

/**
 * Converts first page of a PDF to image data URL.
 */
async function pdfToImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/png");
}

/**
 * Extracts text from an image or PDF.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  try {
    let imageDataUrl: string;

    if (file.type === "application/pdf") {
      imageDataUrl = await pdfToImage(file);
    } else if (file.type.startsWith("image/")) {
      imageDataUrl = URL.createObjectURL(file);
    } else {
      throw new Error("Unsupported file type. Upload a PDF or image only.");
    }

    const result = await Tesseract.recognize(imageDataUrl, "eng", {
      logger: (m) => console.log("🔍 OCR progress:", m.status, m.progress),
    });

    if (file.type.startsWith("image/")) URL.revokeObjectURL(imageDataUrl);

    console.log("✅ Extracted text:", result.data.text);
    return result.data.text;
  } catch (err) {
    console.error("❌ OCR failed:", err);
    return "";
  }
}
