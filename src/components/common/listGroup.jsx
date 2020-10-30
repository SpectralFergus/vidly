import React from "react";
const ListGroup = ({
  items,
  onItemSelected,
  displayProp,
  valProp,
  selectedItem,
}) => {
  return (
    <ul className="clickable list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelected(item)}
          key={item[valProp]}
          className={
            item === selectedItem ||
            (item.name === "All Genres" && selectedItem == null)
              ? "list-group-item active"
              : "list-group-item"
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
