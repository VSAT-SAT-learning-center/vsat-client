import About from '../pages/About';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home';
import Learning from '../pages/Learning';
import LearningPart from '../pages/LearningPart';
import LearningPartDetail from '../pages/LearningPartDetail/LearningPartDetail';
import News from '../pages/News/News';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

const routesConfig = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  { path: '/profile', component: Profile, protected: true },
  { path: '/learning', component: Learning, protected: true },
  { path: '/learning/:slug', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection/:id', component: LearningPartDetail, protected: true },
  { path: "*", component: NotFound },
];

export default routesConfig;
