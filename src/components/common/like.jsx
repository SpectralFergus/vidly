import React from "react";

const Like = (props) => {
  let likeClasses = "fa fa-heart";
  if (!props.liked) {
    likeClasses += "-o";
  }
  return (
    <i
      onClick={props.onClick}
      className={likeClasses}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
