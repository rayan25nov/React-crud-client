import React from "react";
import Classes from "./SignupModal.module.css";

function SignupModal() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={Classes.signup_modal_container}>
      <h4 className={Classes.signup_modal_heading}>
        You have been sucessfully Registered.
      </h4>
      <p className={Classes.signup_modal_text}>Click here to login</p>
      <button className={Classes.signup_modal_btn} onClick={handleReload}>
        Go to Login
      </button>
    </div>
  );
}

export default SignupModal;
