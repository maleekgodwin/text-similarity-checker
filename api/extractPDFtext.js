const fs = require("fs");
const pdf = require("pdf-parse");

async function getPDFText(fileName, folderName) {
  const folder = folderName.toLowerCase() === "doc1" ? "Docs1" : "Docs2";
  let dataBuffer = fs.readFileSync(`./${folder}/${fileName}`);
  const data = await pdf(dataBuffer);

  // number of pages
  // console.log(data.numpages);
  // // number of rendered pages
  // console.log(data.numrender);
  // // PDF info
  // console.log(data.info);
  // // PDF metadata
  // console.log(data.metadata);
  // // PDF.js version
  // // check https://mozilla.github.io/pdf.js/getting_started/
  // console.log(data.version);
  // // PDF text

  // Get the extracted text from the PDF file
  const extracted_text = data.text;
  const totalpage_number = data.numpages;
  const data_info = data.info;
  return { extracted_text, totalpage_number, data_info };
}

exports.getPDFText = getPDFText;
