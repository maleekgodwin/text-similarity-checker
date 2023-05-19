import style from "../styles/home.module.css";
import { PasteText } from "./pasteText";
import { UploadFile } from "./uploadFiles";

export const AddDocOptions = ({ handlePasteText, handleUpload }) => {
  return (
    <div className={style.addOptions}>
      <UploadFile />
      <p>OR</p>
      <PasteText pasteText={(text) => handlePasteText(text)} />
    </div>
  );
};
