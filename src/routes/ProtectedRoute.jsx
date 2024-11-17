import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "~/components/General/Loader";
import { AuthContext } from "~/contexts/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { user, isLoggedIn, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (
    user?.role === "Student" &&
    user?.isTrialExam === false &&
    !location.pathname.startsWith("/trial-exam")
  ) {
    return <Navigate to="/trial-exam" replace />;
  }

  if (roles?.length > 0 && !roles?.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    location.pathname.startsWith("/trial-exam") &&
    user?.isTrialExam === true
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
