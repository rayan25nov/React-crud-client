import { React, useRef, useEffect } from "react";
import Classes from "./ErrorModal.module.css";
const ErrorModal = (props) => {
  const modalRef = useRef(null);

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);
  return (
    <div className={Classes.modal}>
      <div className={Classes.modal_background} ref={modalRef}>
        <div className={Classes.modal_content}>
          <button className={Classes.modal_close} onClick={props.onClose}>
            X
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
