import React from "react";

const StaticTable = ({ data, editForm }) => {
  console.log(data);
  return (
    <div>
      {
        <table>
          <tr>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>gender</th>
            <th>ip_address</th>
          </tr>

          {data &&
            data.map((item, index) => {
              return (
                <tr>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.ip_address}</td>
                </tr>
              );
            })}
        </table>
      }
    </div>
  );
};

export default StaticTable;
