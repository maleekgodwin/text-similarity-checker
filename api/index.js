const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { extractText, saveFileToFolder } = require("./handleTextExtract");

const { calculateSimilarity } = require("./checkSimilarity");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Set up a route to handle file uploads
app.post("/uploaddoc", upload.single("file"), (req, res) => {
  const file = req.file;

  const queryParam = req.query.doc; // Access query parameter 'param1'
  saveFileToFolder(file, queryParam);
});

// Set up a route to handle text uploads
app.post("/similarities", async (req, res) => {
  const { file1, file2 } = req.body;
  let text1 = await getText(file1);
  let text2 = await getText(file2);
  let results = [];
  let textArray = [];
  const overallSimilarity = calculateSimilarity(text1, text2);
  results.push({ overall_similarity: overallSimilarity });

  text1 = text1.split(/[.?!]\s/);
  text2 = text2.split(/[.?!]\s/);

  const arrayLength = getTextArrayLength(text1, text2);

  for (let j = 0; j < arrayLength.smallTextArray; j++) {
    const similarity = calculateSimilarity(text1[j], text2[j]);
    textArray.push({ text1: text1[j], text2: text2[j], similarity });
  }
  for (let i = arrayLength.smallTextArray; i < arrayLength.longTextArray; i++) {
    textArray.push({
      text1: text1[i] == undefined ? null : text1[i],
      text2: text2[i] == undefined ? null : text2[i],
      similarity: 0,
    });
  }
  results.push({ paragraph_results: textArray });

  res.send({ result: results });
});
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

async function getText(file) {
  let text;

  try {
    if (file.docType === "docFile") {
      text = await extractText(file.fileName, file.docsNum);
      text = text.extracted_text;
    } else if (file.docType === "plainText") {
      text = file.file;
    }

    return text;
  } catch (error) {
    throw error;
  }
}

function getTextArrayLength(text1, text2) {
  if (text1.length >= text2.length) {
    return { smallTextArray: text2.length, longTextArray: text1.length };
  } else {
    return { smallTextArray: text1.length, longTextArray: text2.length };
  }
}
