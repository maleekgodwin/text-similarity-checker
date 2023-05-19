// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useEffect, useState } from "react";
import style from "../styles/results.module.css";

const SimilaritiesResults = ({ resultObj, returnPage }) => {
  const [initialScores, setInitialScores] = useState(0);
  const [scoreRangeColor, setCoreRangeColor] = useState([]);

  const percentage = convertScoreToPercentage(resultObj[0].overall_similarity);
  const speed = 20;

  useEffect(() => {
    setScoreColor(initialScores);
    if (initialScores < percentage) {
      const animateScore = setInterval(() => {
        setInitialScores((prevScores) => prevScores + 1);
      }, speed);

      return () => clearInterval(animateScore);
    }
  }, [initialScores, percentage]);

  const setScoreColor = (scores) => {
    if (scores >= 70) {
      setCoreRangeColor(["#205E61", "#B9EDDD"]);
    } else if (scores >= 50) {
      setCoreRangeColor(["#2F58CD", "#62CDFF"]);
    } else if (scores < 40) {
      setCoreRangeColor(["#E04D01", "#F7C04A"]);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.back} onClick={() => returnPage()}>
        Input page
      </div>
      <div className={style.resultScore}>
        <div
          className={style.score}
          style={{
            background: `conic-gradient( ${scoreRangeColor[0]} ${
              initialScores * 3.6
            }deg, ${scoreRangeColor[1]} ${initialScores * 3.6}deg)`,
          }}
        >
          <div className={style.scoreValue}>{initialScores}%</div>
        </div>
        <div>
          <h3 className={style.header}>Similarity score</h3>
          <div className={style.scoreKeysContainer}>
            <div className={style.scoreKey}>
              <div className={style.high}></div> High
            </div>
            <div className={style.scoreKey}>
              <div className={style.average}></div> Average
            </div>
            <div className={style.scoreKey}>
              <div className={style.low}></div> Low
            </div>
          </div>
        </div>
      </div>
      <div className={style.review}>
        {resultObj[1].paragraph_results?.map((paragraph) => {
          return <Paragraph paragraphInfo={paragraph} />;
        })}
      </div>
    </div>
  );
};

const convertScoreToPercentage = (score) => {
  const PERCENTAGE = 100;
  return Math.round(score * PERCENTAGE);
};

const Paragraph = ({ paragraphInfo }) => {
  const paragraphScore = convertScoreToPercentage(paragraphInfo.similarity);

  let paragraphClassName;

  if (paragraphScore >= 70) {
    paragraphClassName = `${style.paragraph} ${style.highSimilarity}`;
  } else if (paragraphScore >= 50) {
    paragraphClassName = `${style.paragraph} ${style.averageSimilarity}`;
  } else {
    paragraphClassName = `${style.paragraph} ${style.lowSimilarity}`;
  }

  return (
    <div className={paragraphClassName}>
      <p className={style.textIndex}>{paragraphInfo.text1}</p>
      <div className={style.paragraphScore}>{paragraphScore}%</div>
      <p className={style.textIndex}>{paragraphInfo.text2}</p>
    </div>
  );
};

export default SimilaritiesResults;
