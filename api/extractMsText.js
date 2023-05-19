const WordExtractor = require("word-extractor");

async function getMSText(fileName, folderName) {
  const folder = folderName.toLowerCase() === "doc1" ? "Docs1" : "Docs2";
  const extractor = new WordExtractor();
  const extracted = await extractor.extract(`./${folder}/${fileName}`);
  const extracted_text = extracted.getBody();

  return { extracted_text };
}

exports.getMSText = getMSText;
