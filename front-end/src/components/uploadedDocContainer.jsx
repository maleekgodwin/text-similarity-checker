import style from "../styles/home.module.css";
import { PasteText } from "./pasteText";
import { UploadFile } from "./uploadFiles";

// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export const UploadedDocsContainer = ({
  file,
  handleAddFile,
  pasteText,
  docsNum,
}) => {
  const docs = [
    { uri: (window.URL || window.webkitURL).createObjectURL(file) },
  ];

  const getFileName = (file) => {
    const fileType = file.name.split(".").pop();

    switch (fileType.toLowerCase()) {
      case "pdf":
        return (
          <div className={style.fileAdded}>
            <img src="https://img.icons8.com/officel/50/null/pdf-2.png" />
            <p>{file.name}</p>
          </div>
        );

      case "docx":
        return (
          <div className={style.fileAdded}>
            <img src="https://img.icons8.com/stickers/50/null/doc.png" />
            <p>{file.name}</p>
          </div>
        );

      case "doc":
        return (
          <div className={style.fileAdded}>
            <img src="https://img.icons8.com/stickers/50/null/doc.png" />
            <p>{file.name}</p>
          </div>
        );

      case "pptx":
        return (
          <div className={style.fileAdded}>
            <img src="https://img.icons8.com/stickers/50/null/ppt.png" />
            <p>{file.name}</p>
          </div>
        );

      case "ppt":
        return (
          <div className={style.fileAdded}>
            <img src="https://img.icons8.com/stickers/50/null/ppt.png" />
            <p>{file.name}</p>
          </div>
        );

      default:
        <div className={style.fileAdded}>
          <p>{file.name}</p>
        </div>;
        break;
    }
  };

  return (
    <div className="uploadDocContainer">
      <div className={style.fileContainer}>
        {getFileName(file)}
        <div className={style.changeOption}>
          <UploadFile
            actionText="Change file"
            handleAddFile={(file) => handleAddFile(file)}
            docsNum={docsNum}
          />

          <PasteText
            handlePasteText={(text) => pasteText(text)}
            docsNum={docsNum}
          />
        </div>
      </div>
      <div className={style.preview}>
        <DocViewer
          className={style.preview}
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
        />
      </div>
    </div>
  );
};
