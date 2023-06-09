import { useEffect, useState } from "react";

import Form from "../Form";
import Table from "../Table";
import Styles from "./DataComponent.module.css";
import { Link } from "react-router-dom";

const DataComponent = ({ setIsAuthenticated }) => {
  const api = process.env.API_URL;

  // showForm
  /////////////////////////////////////////////////////////////////
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [selectedRow, setSelectedRow] = useState();
  ///////////////////////////////////////////////////////////////////
  //   [
  //   "first_name",
  //   "last_name",
  //   "email",
  //   "gender",
  //   "ip_address",
  // ]

  /////////////////////////////////////////////////////////
  // Uncomment It from here for other components
  useEffect(() => {
    // fetch data from api
    fetch(`${api}/data`)
      .then((data) => data.json())
      .then((newData) => {
        setData([...newData]);

        let tempCols = newData && newData[0] ? Object.keys(newData[0]) : null;
        setColumns(tempCols);
      });
  }, []);

  const getDataFromApi = async () => {
    const resonse = await fetch(`${api}/data`);

    const newData = await resonse.json();
    setData([...newData]);
  };

  const deleteOneRow = (id) => {
    // console.log(id);
    fetch(`${api}/data/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => getDataFromApi())
      .catch((err) => console.log(err));
  };

  const updateOneRow = (updatedData, id) => {
    fetch(`${api}/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => console.log(response))
      .then(async () => {
        await getDataFromApi();
        setShowForm(false);
        setSelectedRow(null);
      })
      .catch((err) => console.log(err));
  };

  const createNewRecord = (newData) => {
    fetch(`${api}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => console.log(response))
      .then(async () => {
        await getDataFromApi();
        setShowForm(false);
        setSelectedRow(null);
      })
      .catch((err) => console.log(err));
    console.log(newData);
  };

  const selectRowForUpdate = (newRow) => {
    setSelectedRow(newRow);
    setShowForm(true);
  };
  const goBackToForm = () => {
    setShowForm(false);
    setSelectedRow(null);
  };
  return (
    <>
      <button className={Styles.create_btn} onClick={() => setShowForm(true)}>
        Create New
      </button>
      {data && showForm ? (
        <Form
          updateOneRow={updateOneRow}
          selectedRow={selectedRow}
          addNewRecord={createNewRecord}
          setShowForm={setShowForm}
          goBackToForm={goBackToForm}
          createNewrecord={createNewRecord}
        />
      ) : (
        <Table
          columns={columns}
          data={data}
          deleteSelectedRow={deleteOneRow}
          selectRowForUpdate={selectRowForUpdate}
        />
      )}
      <Link
        className={Styles.logout_btn}
        onClick={() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }}
        to={"/"}
      >
        Logout
      </Link>
    </>
  );
};

export default DataComponent;
