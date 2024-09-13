import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

// Simulate authentication (replace with real authentication logic)
const isAuthenticated = true;

function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
