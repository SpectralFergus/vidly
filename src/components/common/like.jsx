import React from "react";

const Like = ({ liked, onClick }) => {
  let likeClasses = "fa fa-heart";
  if (!liked) {
    likeClasses += "-o";
  }
  return (
    <i
      onClick={onClick}
      className={likeClasses}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
