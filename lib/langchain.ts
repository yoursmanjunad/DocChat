import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const respnse = await fetch(fileUrl);
  const blob = await respnse.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  //combine pages
  return docs.map((doc) => doc.pageContent).join("\n");
}
