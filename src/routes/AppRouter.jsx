// src/routes/AppRouter.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import routesConfig from './routesConfig'; // Import routes configuration

function AppRouter() {
  return (
    <Router>
      <Routes>
        {routesConfig.map((route, index) => {
          const Page = route.component;
          return route.protected ? (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
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
