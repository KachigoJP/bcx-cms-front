// React imports
import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// UI Imports
import { Spinner } from "react-bootstrap";

// App imports
import { AuthContext } from "../contexts/auth";
import NonLayout from "../components/Layout/NonLayout";
import Layout from "../components/Layout";
import NotFound from "../pages/Utility/404";

import { authRoutes, nonAuthRoutes } from "./allRoutes";
import { ROUTES } from "../helpers/constants";

type RouteProps = {
  component: React.FC;
};

const AuthRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const { component: Component } = props;

  React.useEffect(() => {
    console.log("isAuthenticatedisAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <React.Suspense fallback={<Spinner animation="grow" />}>
        <Component />
      </React.Suspense>
    </Layout>
  );
};

const Routers: React.FC = () => {
  return (
    <Routes>
      {authRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<AuthRoute component={route.component} />}
        />
      ))}

      {nonAuthRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <NonLayout>
              <React.Suspense fallback={<Spinner animation="grow" />}>
                <route.component />
              </React.Suspense>
            </NonLayout>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
