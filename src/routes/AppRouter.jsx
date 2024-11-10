import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext } from "~/contexts/AuthContext";
import Home from "~/pages/Landing/Home";
import ProtectedRoute from "./ProtectedRoute";
import routesConfig from "./routesConfig";

function AppRouter() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const getRedirectPath = (role) => {
    switch (role) {
      case "Admin":
        return "/admin";
      case "Manager":
        return "/manager";
      case "Staff":
        return "/staff";
      case "Teacher":
        return "/teacher";
      case "Student":
        return "/learning";
      default:
        return "/";
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={getRedirectPath(user?.role)} replace />
            ) : (
              <Home />
            )
          }
        />
        {routesConfig.map((route, index) => {
          const Page = route.component;
          return route.protected ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles}>
                  <Page />
                </ProtectedRoute>
              }
            />
          ) : (
            <Route key={index} path={route.path} element={<Page />} />
          );
        })}
      </Routes>
    </Router>
  );
}

export default AppRouter;
