import React from "react";

const Header = ({ title }) => {
  return (
    <nav className="app-header">
      <div className="layout-row align-items-center justify-content-center">
        <h4 id="app-title" className="white-color ml-16 my-0" data-testid="header-1">
          {title}
        </h4>
      </div>
    </nav>
  );
};

export default Header;
