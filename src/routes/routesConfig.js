// src/routes/routesConfig.jsx
import About from '~/pages/About';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';

// Define route configuration as an array of objects
const routesConfig = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: '/profile', component: Profile, protected: true },
  { path: "*", component: NotFound },
];

export default routesConfig;
