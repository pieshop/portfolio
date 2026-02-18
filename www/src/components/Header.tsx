import React from 'react';
import NavBar from 'containers/NavBar';

const Header: React.FC = () => {
  return (
    <header>
      <div className="page-header text-center">
        <h1>
          Stephen Hamilton <small className="text-muted">Interactive Developer</small>
        </h1>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
