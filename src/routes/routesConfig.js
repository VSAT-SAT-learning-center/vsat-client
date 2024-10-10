import About from "~/pages/Landing/About";
import Contact from "~/pages/Landing/Contact";
import Home from "~/pages/Landing/Home";
import News from "~/pages/Landing/News";
import NotFound from '~/pages/NotFound';
import AccountSetting from "~/pages/Staff/AccountSetting";
import Dashboard from "~/pages/Staff/Dashboard";
import Exam from "~/pages/Staff/Exam";
import ExamCreate from "~/pages/Staff/Exam/ExamCreate";
import ExamScore from "~/pages/Staff/Exam/ExamScore";
import ExamStructure from "~/pages/Staff/Exam/ExamStructure";
import Feedback from "~/pages/Staff/Feedback";
import LearningMaterial from "~/pages/Staff/LearningMaterial";
import LearningMaterialAss from "~/pages/Staff/LearningMaterial/LearningMaterialAss";
import LearningMaterialCreateDetails from "~/pages/Staff/LearningMaterial/LearningMaterialCreateDetails";
import LearningMaterialCreateLesson from "~/pages/Staff/LearningMaterial/LearningMaterialCreateLesson";
import LearningMaterialCreateTopic from "~/pages/Staff/LearningMaterial/LearningMaterialCreateTopic";
import Practice from "~/pages/Staff/Practice";
import PracticeCreate from "~/pages/Staff/Practice/PracticeCreate";
import QuestionExam from "~/pages/Staff/QuestionExam";
import QuestionExamCreate from "~/pages/Staff/QuestionExam/QuestionExamCreate";
import QuestionQuizz from "~/pages/Staff/QuestionQuizz";
import QuestionQuizzCreate from "~/pages/Staff/QuestionQuizz/QuestionQuizzCreate";
import Settings from "~/pages/Staff/Settings";
import Students from "~/pages/Staff/Students";
import StudyProfile from "~/pages/Staff/Students/StudyProfile";
import Teachers from "~/pages/Staff/Teachers";
import AssignStudents from "~/pages/Staff/Teachers/AssignStudents";
import Learning from '~/pages/Student/Learning';
import LearningPart from '~/pages/Student/LearningPart';
import LearningPartDetail from '~/pages/Student/LearningPartDetail';


const routesConfig = [
  // Landing page routes
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  // Student routes
  { path: '/learning', component: Learning, protected: true },
  { path: '/learning/:slug', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection', component: LearningPart, protected: true },
  { path: '/learning/:slug/:idSection/:id', component: LearningPartDetail, protected: true },

  // Staff routes
  { path: '/staff', component: Dashboard, protected: true },
  // Staff learning material routes
  { path: '/staff/learning-material/overview', component: LearningMaterial, protected: true },
  { path: '/staff/learning-material/create', component: LearningMaterialCreateDetails, protected: true },
  { path: '/staff/learning-material/create/topics', component: LearningMaterialCreateTopic, protected: true },
  { path: '/staff/learning-material/create/lessons', component: LearningMaterialCreateLesson, protected: true },
  { path: '/staff/learning-material/assignments', component: LearningMaterialAss, protected: true },
  // Staff question bank routes
  { path: '/staff/question-bank/bank', component: QuestionExam, protected: true },
  { path: '/staff/question-bank/create', component: QuestionExamCreate, protected: true },
  // Staff quizz question bank routes
  { path: '/staff/question-quizz/bank', component: QuestionQuizz, protected: true },
  { path: '/staff/question-quizz/create', component: QuestionQuizzCreate, protected: true },
  // Staff exam routes
  { path: '/staff/exams/overview', component: Exam, protected: true },
  { path: '/staff/exams/create', component: ExamCreate, protected: true },
  { path: '/staff/exams/structure', component: ExamStructure, protected: true },
  { path: '/staff/exams/score', component: ExamScore, protected: true },
  // Staff practice routes
  { path: '/staff/practice/overview', component: Practice, protected: true },
  { path: '/staff/practice/create', component: PracticeCreate, protected: true },
  // Staff manage students routes
  { path: '/staff/students/manage', component: Students, protected: true },
  { path: '/staff/students/study-profile', component: StudyProfile, protected: true },
  // Staff manage teacher routes
  { path: '/staff/teachers/manage', component: Teachers, protected: true },
  { path: '/staff/teachers/assign-students', component: AssignStudents, protected: true },
  // Staff manage feedback routes
  { path: '/staff/feedback', component: Feedback, protected: true },
  // Staff account setting routes
  { path: '/staff/account-setting', component: AccountSetting, protected: true },
  // Staff settings routes
  { path: '/staff/setting', component: Settings, protected: true },

  // Not found route
  { path: "*", component: NotFound },
];

export default routesConfig;
