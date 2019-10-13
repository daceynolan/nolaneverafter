import React from "react";

const Header = props => {
  return (
    <div className="header">
      <h1 className="header__title">Nolan Wedding Photos</h1>
      <div className="header__photo-count">
        {props.currentPhotoCount} out of {props.TOTAL_PHOTO_COUNT}
      </div>
    </div>
  );
};

export default Header;
