import React from "react";

const Like = ({ liked, onClick }) => {
  let likeClasses = "clickable fa fa-heart";
  if (!liked) {
    likeClasses += "-o";
  }
  return <i onClick={onClick} className={likeClasses} aria-hidden="true"></i>;
};

export default Like;
