import React from "react";

import CloseIcon from "./CloseIcon";
import DownloadIcon from "./DownloadIcon";
import { downloadPhoto } from "../utils/photos";

const ModalActions = ({ modalProps, currentView }) => {
  const { onClose } = modalProps;

  const onDownload = () => {
    const downloadSource = currentView.source.download;
    downloadPhoto(downloadSource);
  };

  return (
    <div className="modal-actions">
      <button className="modal-actions__button" onClick={onDownload}>
        <DownloadIcon />
      </button>
      <button className="modal-actions__button" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalActions;
