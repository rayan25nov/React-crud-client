import React from "react";
import Styles from "./Table.module.css";
const Table = ({
  columns,
  data,
  editForm,
  deleteSelectedRow,
  selectRowForUpdate,
}) => {
  // console.log(columns);
  // console.log(data);

  return (
    <div>
      <table className={Styles.table}>
        <thead>
          <tr key="theader">
            {columns &&
              columns.map((item, index) => (
                <th key={`column_${index}`}>{item}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data &&
            columns &&
            data.map((eachRow, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((item, index) => (
                  <td key={`column_data_${index}_${rowIndex}`}>
                    {eachRow[item]}
                  </td>
                ))}
                <td>
                  <button className={Styles.edit_btn} onClick={() => selectRowForUpdate(eachRow)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className={Styles.delete_btn} onClick={() => deleteSelectedRow(eachRow._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
