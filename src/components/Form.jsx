import React, { useEffect, useState } from "react";
import Styles from "./Form.module.css";

const Form = ({ selectedRow, updateOneRow, goBackToForm, createNewrecord }) => {
  const [formData, setFormData] = useState();

  useEffect(() => {
    let tempObj = selectedRow
      ? { ...selectedRow }
      : {
          // _id: "",
          first_name: "",
          last_name: "",
          email: "",
          gender: "",
          ip_address: "",
          country: "",
        };
    setFormData(tempObj);
  }, []);
  // form submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRow) updateOneRow(formData, formData._id);
    else createNewrecord(formData);
    // goBackToForm();
    // console.log(formData);
  };

  // When User input data this Function will call
  const onInputChange = (e) => {
    // const { name, value } = e.target;
    const name = e.target.name;
    const value = e.target.value;
    let tempObj = { ...formData, [name]: value };
    setFormData({ ...tempObj });
  };
  return (
    <>
      {formData && (
        <form className={Styles.form} onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={formData._id}
            placeholder={formData._id}
            disabled
          />
          <label htmlFor="firstname">First Name : </label>
          <input
            type="text"
            name="first_name"
            id="firstname"
            value={formData.first_name}
            onChange={onInputChange}
          />
          <label htmlFor="lastname">Last Name : </label>
          <input
            type="text"
            name="last_name"
            id="lastname"
            value={formData.last_name}
            onChange={onInputChange}
          />
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="eg abc@provider.com"
            value={formData.email}
            onChange={onInputChange}
          />
          <label htmlFor="gender">Gender : </label>
          <div>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="Male"
              onChange={onInputChange}
              checked={formData.gender === "Male" ? true : false}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              id="gender"
              value="Female"
              onChange={onInputChange}
              checked={formData.gender === "Female" ? true : false}
            />{" "}
            Female
          </div>
          <label htmlFor="ip">Ip Address : </label>
          <input
            type="text"
            name="ip_address"
            id="ip"
            onChange={onInputChange}
            value={formData.ip_address}
          />
          <label htmlFor="country">Country : </label>
          <input
            type="text"
            name="country"
            id="country"
            onChange={onInputChange}
            value={formData.country}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <button className={Styles.back_btn} onClick={() => goBackToForm()}>Go Back</button>
    </>
  );
};

export default Form;
