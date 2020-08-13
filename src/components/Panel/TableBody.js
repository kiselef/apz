import React from "react";
import TableRow from "./TableRow";

function TableBody(props) {
  let key = 0;
  return (
    <div className="table-data">
      {props.rows.map(row => <TableRow key={`${++key}_${row.number}`} row={row}/>)}
    </div>
  );
}

export default TableBody;
