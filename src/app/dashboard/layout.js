
import React from 'react';
import SessionExpirationHandler from "../../components/SessionExpirationHandler";

const Layout = ({ children }) => {
  return (
    <div>
        {/* When session is null and status is unauthenticated automatic signOut */}
        {/* SignOut when jwt expires */}
      <SessionExpirationHandler />
      <main>{children}</main>
    
    </div>
  );
};

export default Layout;
