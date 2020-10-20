import React from "react";
const ListGroup = (props) => {
  const { items, onItemSelected, displayProp, valProp } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelected(item)}
          key={item[valProp]}
          className="list-group-item"
        >
          {item[displayProp]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
