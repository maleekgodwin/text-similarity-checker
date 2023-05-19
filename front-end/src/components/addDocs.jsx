import { useState } from "react";
import style from "../styles/home.module.css";
import { PasteContainer } from "./pasteContianer";
import { PasteText } from "./pasteText";
import { UploadFile } from "./uploadFiles";
import { UploadedDocsContainer } from "./uploadedDocContainer";

export const AddDocs = ({ docsNum, handleSetFile }) => {
  const [fileUpload, setFileUpload] = useState("");
  const [pastedtext, setPastedtext] = useState("");
  const [docAdded, setdocAdded] = useState(false);

  const addFile = (file) => {
    setFileUpload(file);
    handleSetFile(file);
    setdocAdded(true);
    setPastedtext("");
  };

  const pasteText = (text) => {
    setPastedtext(text);
    handleSetFile(text);
    setFileUpload("");
    setdocAdded(true);
  };

  const clearDoc = () => {
    handleSetFile(false);
    setPastedtext("");
    setFileUpload("");
    setdocAdded(false);
  };
  return (
    <div className={`${style.col}`}>
      <p>{docsNum}</p>
      {!docAdded && (
        <div className={style.addOptions}>
          <UploadFile
            docsNum={docsNum}
            handleAddFile={(file) => addFile(file)}
          />
          <p>OR</p>
          <PasteText
            docsNum={docsNum}
            handlePasteText={(text) => pasteText(text)}
          />
        </div>
      )}
      {pastedtext && (
        <>
          <span className={style.close} onClick={() => clearDoc()}>
            x
          </span>
          <PasteContainer
            pastedText={pastedtext.file}
            handlePasteText={(text) => pasteText(text)}
          />
        </>
      )}
      {fileUpload && (
        <UploadedDocsContainer
          file={fileUpload.file}
          handleAddFile={(file) => addFile(file)}
          pasteText={(text) => pasteText(text)}
          docsNum={docsNum}
        />
      )}
    </div>
  );
};
