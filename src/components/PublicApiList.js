import React from "react";

const PublicApiList = (loadedDataList) => {
  const { loadedDataList: publicApiList } = loadedDataList;
  return (
    <div>
      <table className="table table-dark stocktable">
        <thead>
          <tr>
            <th>API</th>
            <th>Description</th>
            <th>Auth</th>
            <th>HTTPS</th>
            <th>Cors</th>
            <th>Link</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {publicApiList?.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.API}</td>
                <td>{val.Description}</td>
                <td>{val.Auth}</td>
                <td>{val.HTTPS ? "true": "false"}</td>
                <td>{val.Cors}</td>
                <td><a href={val.Link}>{val.Link}</a></td>
                <td>{val.Category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PublicApiList;
