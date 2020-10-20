import React from "react";
const ListGroup = (props) => {
  const { items, onItemSelected, displayProp, valProp, selectedItem } = props;
  return (
    <ul className="list-group" style={{cursor:"pointer"}}>
      {items.map((item) => (
        <li
          onClick={() => onItemSelected(item)}
          key={item[valProp]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[displayProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  displayProp: "name",
  valProp: "_id",
};

export default ListGroup;
