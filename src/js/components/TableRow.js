import React from "react";

const TableRow = ({ type, listItem, reqQty, isSelected, onreqQntyChange, onCheckboxChange }) => {

  switch (type) {
    case 'tool':
      return (<tr key="inveRow">
        <td key="0">
          <input
            type="checkbox"
            name={listItem.id}
            checked={isSelected}
            onChange={onCheckboxChange}
          />
        </td>
        <td key="1" >{listItem.itemName}</td>
        <td key="2">{listItem.availability}</td>
        <td key="3">{listItem.cost}</td>
        <td key="4" >
          <input
            type="number"
            name={listItem.id}
            defaultValue={reqQty}
            onChange={onreqQntyChange}
          />
        </td>

      </tr>);
    case 'worker':
      return (<tr key="workerRow">
        <td key="5">
          <input
            type="checkbox"
            name={listItem.id}
            checked={isSelected}
            onChange={onCheckboxChange}
          />
        </td>
        <td key="6">{listItem.name}</td>
        <td key="7">{listItem.avail_per_day}</td>
        <td key="8">{listItem.cost_per_hr}</td>
        <td key="9" >
          <input
            type="number"
            name={listItem.id}
            defaultValue={reqQty}
            onChange={onreqQntyChange}
          />
        </td>
      </tr>);
    default:
      return;
  }
}

export default TableRow;