import { useState } from "react";
import style from "../styles/home.module.css";

export const PasteContainer = ({ pastedText, handlePasteText, docsNum }) => {
  const [text, setText] = useState(pastedText);
  return (
    <textarea
      className={style.pasteContainer}
      value={text}
      onInput={(e) => {
        setText(e.target.value);
        handlePasteText({
          file: e.target.value,
          docType: "plainText",
          docsNum: docsNum,
        });
      }}
    />
  );
  // return <div className={style.pasteContainer}>{text}</div>;
};
