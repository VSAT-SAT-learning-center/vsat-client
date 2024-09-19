import About from '../pages/About';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home';
import News from '../pages/News/News';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

const routesConfig = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  { path: '/profile', component: Profile, protected: true },
  { path: "*", component: NotFound },
];

export default routesConfig;
