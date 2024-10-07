import About from "~/pages/Landing/About";
import Contact from "~/pages/Landing/Contact";
import Home from "~/pages/Landing/Home";
import News from "~/pages/Landing/News";
import NotFound from '~/pages/NotFound';
import Learning from '~/pages/Student/Learning';
import LearningPart from '~/pages/Student/LearningPart';
import LearningPartDetail from '~/pages/Student/LearningPartDetail';


const routesConfig = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  { path: '/learning', component: Learning, protected: true },
  { path: '/learning/:slug', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection/:id', component: LearningPartDetail, protected: true },
  { path: "*", component: NotFound },
];

export default routesConfig;
