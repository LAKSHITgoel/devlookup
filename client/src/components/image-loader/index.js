import React from "react";
import "./index.css";

export const LoaderBar = props => {
  return (
    <div className="loader-container">
      <div style={{ width: `${props.progress}%` }} className="loader-bar" />
    </div>
  );
};
