import React from "react";

// Layout Related Components
import Header from "./Header";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import SidebarAdmin from "./SidebarAdmin";
import SidebarAdminMobile from "./SidebarAdminMobile";
import Footer from "./Footer";
import { AuthContext } from "contexts/auth";

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { user } = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <div className="main-wrapper">
        {user?.role === "admin" ? (
          <>
            <SidebarAdmin />
            <SidebarAdminMobile />
          </>
        ) : (
          <>
            <SidebarDesktop />
            <SidebarMobile />
          </>
        )}

        <div className="page-wrapper">
          <Header />
          <div className="page-content">{props.children}</div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
