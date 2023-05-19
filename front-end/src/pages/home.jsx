import { useState } from "react";

import { AddDocs } from "../components/addDocs";

import style from "../styles/home.module.css";
import axios from "axios";
import SimilaritiesResults from "./similarityResults";
import Loader from "../components/loader";
import Alerts from "../components/alert";

const Home = () => {
  const [file1, setFile1] = useState(false);
  const [file2, setFile2] = useState(false);
  const [similarityResult, setSimilarityResult] = useState({});
  const [resultReady, setResultReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertText, setAlertText] = useState("");

  const checkSimilarities = async () => {
    if (checkFile(file1, file2)) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/similarities",
          {
            file1,
            file2,
          }
        );
        if (response.status == 200) {
          setResultReady(true);
          setSimilarityResult(response);
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (err) {
        // setAlertText(err.response === "undefined" ? "connecton error" : null);
        setIsLoading(false);
      }
    }
  };

  const checkFile = (file1, file2) => {
    if (!file1 && !file2) {
      setAlertText("Doc1 and Doc2 are empty, add a document or paste text");
      return false;
    } else if (!file1) {
      setAlertText("Doc1 is empty, add a document or paste text");
      return false;
    } else if (!file2) {
      setAlertText("Doc2 is empty, add a document or paste text");
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {!resultReady && (
        <div className={style.wrapper}>
          <Alerts
            error
            message={alertText}
            removeAlert={() => setAlertText("")}
          />
          {isLoading && <Loader />}
          <div className={style.mainContainer}>
            <div className={style.card}>
              <AddDocs
                docsNum="Doc1"
                handleSetFile={(file) => setFile1(file)}
              />

              <div className={style.divider}></div>

              <AddDocs
                docsNum="Doc2"
                handleSetFile={(file) => setFile2(file)}
              />
            </div>

            <button
              // disabled={!file1 && !file2 ? true : false}
              className={style.btn}
              onClick={() => checkSimilarities()}
            >
              Check Similarities
            </button>
          </div>
        </div>
      )}

      {resultReady && (
        <SimilaritiesResults
          resultObj={similarityResult?.data?.result}
          returnPage={() => setResultReady(false)}
        />
      )}
    </>
  );
};

export default Home;
