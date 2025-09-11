import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Tea Garden Explorer</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Tea Garden Explorer</p>
      </footer>
    </div>
  );
};

export default Layout;