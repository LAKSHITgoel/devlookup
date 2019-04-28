import React from "react";
import "./avatarpreview.css";

const AvatarPreview = ({ src,size }) => {
  return (
    size ? <img style={{maxWidth:25}} src={src} alt="" className="avatar-preview" /> :
      <img src={src} alt="" className="avatar-preview" />
  );
};
export default AvatarPreview;
