import React from "react";
import "./toast.css";
import { LoaderBar } from "../image-loader";

const Toast = props => {
  return (
    <div className="toast">
      <div className="toast-body">
        <LoaderBar progress={props.progress} />
      </div>
    </div>
  );
};

export default Toast;
