import React from "react";
import "./avatarpreview.css";

const AvatarPreview = ({ src }) => {
  return (
    <div className="avatar-preview">
      <img src={src} alt="" className="avatar-preview" />
    </div>
  );
};
export default AvatarPreview;
