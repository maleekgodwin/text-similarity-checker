const natural = require("natural");

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const stopwords = new Set(natural.stopwords);

// Preprocess the text
const preprocessText = (text) => {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const filteredTokens = tokens.filter((token) => !stopwords.has(token));
  const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));
  return stemmedTokens;
};

// Calculate similarity using Jaccard index
const calculateSimilarity = (sentence1, sentence2) => {
  const preprocessedSentence1 = preprocessText(sentence1);
  const preprocessedSentence2 = preprocessText(sentence2);

  const intersection = new Set(
    preprocessedSentence1.filter((token) =>
      preprocessedSentence2.includes(token)
    )
  );
  const union = new Set([...preprocessedSentence1, ...preprocessedSentence2]);
  const similarity = intersection.size / union.size;

  return similarity;
};

module.exports = { calculateSimilarity };
