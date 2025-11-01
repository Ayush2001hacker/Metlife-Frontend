import * as pdfjsLib from "pdfjs-dist";

// 👇 Use your locally hosted worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export default pdfjsLib;
