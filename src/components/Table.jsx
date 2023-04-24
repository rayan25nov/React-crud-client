import React from "react";

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
      <table>
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
                  <button onClick={() => selectRowForUpdate(eachRow)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteSelectedRow(eachRow._id)}>
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
