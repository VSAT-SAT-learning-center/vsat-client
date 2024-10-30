import DuplicatedQuestionView from "~/components/Staff/QuestionExamCreate/DuplicatedQuestionView";
import Account from "~/pages/Admin/Account";
import CreateAccount from "~/pages/Admin/Account/CreateAccount";
import AdminAccountSetting from "~/pages/Admin/AdminAccountSetting";
import AdminDashboard from "~/pages/Admin/AdminDashboard";
import AdminSettings from "~/pages/Admin/AdminSettings";
import About from "~/pages/Landing/About";
import Contact from "~/pages/Landing/Contact";
import Home from "~/pages/Landing/Home";
import News from "~/pages/Landing/News";
import ManagerAccountSetting from "~/pages/Manager/ManagerAccountSetting";
import ManagerDashboard from "~/pages/Manager/ManagerDashboard";
import ManagerExam from "~/pages/Manager/ManagerExam";
import ExamCensor from "~/pages/Manager/ManagerExam/ExamCensor";
import ExamScoreCensor from "~/pages/Manager/ManagerExam/ExamScoreCensor";
import ExamStructureCensor from "~/pages/Manager/ManagerExam/ExamStructureCensor";
import FeedbackExam from "~/pages/Manager/ManagerExam/FeedbackExam";
import ManagerFeedback from "~/pages/Manager/ManagerFeedback";
import ManagerLearningMaterial from "~/pages/Manager/ManagerLearningMaterial";
import FeedbackLearningMaterial from "~/pages/Manager/ManagerLearningMaterial/FeedbackLearningMaterial";
import LearningMaterialCensor from "~/pages/Manager/ManagerLearningMaterial/LearningMaterialCensor";
import ManagerPractice from "~/pages/Manager/ManagerPractice";
import ManagerQuestionExam from "~/pages/Manager/ManagerQuestionExam";
import QuestionExamCensor from "~/pages/Manager/ManagerQuestionExam/QuestionExamCensor";
import ManagerQuestionQuizz from "~/pages/Manager/ManagerQuestionQuizz";
import QuestionQuizzCensor from "~/pages/Manager/ManagerQuestionQuizz/QuestionQuizzCensor";
import ManagerSettings from "~/pages/Manager/ManagerSettings";
import NotFound from "~/pages/NotFound";
import AccountSetting from "~/pages/Staff/AccountSetting";
import Dashboard from "~/pages/Staff/Dashboard";
import Exam from "~/pages/Staff/Exam";
import ExamCreate from "~/pages/Staff/Exam/ExamCreate";
import ExamScore from "~/pages/Staff/Exam/ExamScore";
import ExamStructure from "~/pages/Staff/Exam/ExamStructure";
import Feedback from "~/pages/Staff/Feedback";
import LearningMaterial from "~/pages/Staff/LearningMaterial";
import LearningMaterialCreateDetails from "~/pages/Staff/LearningMaterial/LearningMaterialCreateDetails";
import LearningMaterialCreateLesson from "~/pages/Staff/LearningMaterial/LearningMaterialCreateLesson";
import LearningMaterialCreateTopic from "~/pages/Staff/LearningMaterial/LearningMaterialCreateTopic";
import LearningMaterialFeedback from "~/pages/Staff/LearningMaterial/LearningMaterialFeedback";
import LearningMaterialPublish from "~/pages/Staff/LearningMaterial/LearningMaterialPublish";
import Practice from "~/pages/Staff/Practice";
import PracticeCreate from "~/pages/Staff/Practice/PracticeCreate";
import QuestionExam from "~/pages/Staff/QuestionExam";
import QuestionExamCreate from "~/pages/Staff/QuestionExam/QuestionExamCreate";
import QuestionFeedback from "~/pages/Staff/QuestionExam/QuestionFeedback";
import QuestionQuizz from "~/pages/Staff/QuestionQuizz";
import QuestionQuizzCreate from "~/pages/Staff/QuestionQuizz/QuestionQuizzCreate";
import Settings from "~/pages/Staff/Settings";
import Students from "~/pages/Staff/Students";
import StudyProfile from "~/pages/Staff/Students/StudyProfile";
import Teachers from "~/pages/Staff/Teachers";
import AssignStudents from "~/pages/Staff/Teachers/AssignStudents";
import Learning from "~/pages/Student/Learning";
import LearningPart from "~/pages/Student/LearningPart";
import LearningPartDetail from "~/pages/Student/LearningPartDetail";
import TeacherAccountSetting from "~/pages/Teacher/TeacherAccountSetting";
import TeacherDashboard from "~/pages/Teacher/TeacherDashboard";
import TeacherSettings from "~/pages/Teacher/TeacherSettings";
import FeedbackQuestionExam from '../pages/Manager/ManagerQuestionExam/FeedbackQuestionExam';
import FeedbackQuestionQuizz from '../pages/Manager/ManagerQuestionQuizz/FeedbackQuestionQuizz';
import QuizzFeedback from "~/pages/Staff/QuestionQuizz/QuizzFeedback/QuizzFeedback";

const routesConfig = [
  // Landing page routes
  { path: "/", component: Home },
  { path: "/test", component: DuplicatedQuestionView },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  // Student routes
  { path: "/learning", component: Learning, protected: true },
  { path: "/learning/:slug", component: LearningPart, protected: true },
  {
    path: "/learning/:slug/:idSection",
    component: LearningPart,
    protected: true,
  },
  {
    path: "/learning/:slug/:idSection/:id",
    component: LearningPartDetail,
    protected: true,
  },

  // Staff routes
  { path: "/staff", component: Dashboard, protected: true },
  // Staff learning material routes
  {
    path: "/staff/learning-material/overview",
    component: LearningMaterial,
    protected: true,
  },
  {
    path: "/staff/learning-material/create",
    component: LearningMaterialCreateDetails,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/topics",
    component: LearningMaterialCreateTopic,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/topics/:unitId",
    component: LearningMaterialCreateTopic,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/lessons",
    component: LearningMaterialCreateLesson,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/lessons/:unitId",
    component: LearningMaterialCreateLesson,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/lessons/:unitId/:lessonId",
    component: LearningMaterialCreateLesson,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/publish",
    component: LearningMaterialPublish,
    protected: true,
  },
  {
    path: "/staff/learning-material/create/publish/:unitId/:lessonId",
    component: LearningMaterialPublish,
    protected: true,
  },
  {
    path: "/staff/learning-material/feedbacks",
    component: LearningMaterialFeedback,
    protected: true,
  },
  // Staff question bank routes
  {
    path: "/staff/question-bank/bank",
    component: QuestionExam,
    protected: true,
  },
  {
    path: "/staff/question-bank/create",
    component: QuestionExamCreate,
    protected: true,
  },
  {
    path: "/staff/question-bank/feedback",
    component: QuestionFeedback,
    protected: true,
  },
  // Staff quizz question bank routes
  { path: '/staff/question-quizz/bank', component: QuestionQuizz, protected: true },
  { path: '/staff/question-quizz/create', component: QuestionQuizzCreate, protected: true },
  { path: '/staff/question-quizz/feedback', component: QuizzFeedback, protected: true },
  // Staff exam routes
  { path: "/staff/exams/overview", component: Exam, protected: true },
  { path: "/staff/exams/create", component: ExamCreate, protected: true },
  { path: "/staff/exams/structure", component: ExamStructure, protected: true },
  { path: "/staff/exams/score", component: ExamScore, protected: true },
  // Staff practice routes
  { path: "/staff/practice/overview", component: Practice, protected: true },
  {
    path: "/staff/practice/create",
    component: PracticeCreate,
    protected: true,
  },
  // Staff manage students routes
  { path: "/staff/students/manage", component: Students, protected: true },
  {
    path: "/staff/students/study-profile",
    component: StudyProfile,
    protected: true,
  },
  // Staff manage teacher routes
  { path: "/staff/teachers/manage", component: Teachers, protected: true },
  {
    path: "/staff/teachers/assign-students",
    component: AssignStudents,
    protected: true,
  },
  // Staff manage feedback routes
  { path: "/staff/feedback", component: Feedback, protected: true },
  // Staff account setting routes
  {
    path: "/staff/account-setting",
    component: AccountSetting,
    protected: true,
  },
  // Staff settings routes
  { path: "/staff/setting", component: Settings, protected: true },

  // Manger routes
  { path: "/manager", component: ManagerDashboard, protected: true },
  // Manger learning material routes
  {
    path: "/manager/learning-material/overview",
    component: ManagerLearningMaterial,
    protected: true,
  },
  {
    path: "/manager/learning-material/censor",
    component: LearningMaterialCensor,
    protected: true,
  },
  {
    path: "/manager/learning-material/feedback",
    component: FeedbackLearningMaterial,
    protected: true,
  },
  // Manger question bank routes
  {
    path: "/manager/question-bank/bank",
    component: ManagerQuestionExam,
    protected: true,
  },
  {
    path: "/manager/question-bank/censor",
    component: QuestionExamCensor,
    protected: true,
  },
  {
    path: "/manager/question-bank/feedback",
    component: FeedbackQuestionExam,
    protected: true,
  },
  // Manger quizz question bank routes
  {
    path: "/manager/question-quizz/bank",
    component: ManagerQuestionQuizz,
    protected: true,
  },
  {
    path: "/manager/question-quizz/censor",
    component: QuestionQuizzCensor,
    protected: true,
  },
  {
    path: "/manager/question-quizz/feedback",
    component: FeedbackQuestionQuizz,
    protected: true,
  },
  // Manger exam routes
  { path: "/manager/exams/overview", component: ManagerExam, protected: true },
  { path: "/manager/exams/censor", component: ExamCensor, protected: true },
  {
    path: "/manager/exams/structure/censor",
    component: ExamStructureCensor,
    protected: true,
  },
  {
    path: "/manager/exams/score/censor",
    component: ExamScoreCensor,
    protected: true,
  },
  { path: "/manager/exams/feedback", component: FeedbackExam, protected: true },
  // Manger practice routes
  {
    path: "/manager/practice/overview",
    component: ManagerPractice,
    protected: true,
  },
  // Manger manage feedback routes
  { path: "/manager/feedback", component: ManagerFeedback, protected: true },
  // Manger account setting routes
  {
    path: "/manager/account-setting",
    component: ManagerAccountSetting,
    protected: true,
  },
  // Manger settings routes
  { path: "/manager/setting", component: ManagerSettings, protected: true },

  // Admin routes
  { path: "/admin", component: AdminDashboard, protected: true },
  // Admin account routes
  { path: "/admin/account/manage", component: Account, protected: true },
  { path: "/admin/account/create", component: CreateAccount, protected: true },
  // Admin account setting routes
  {
    path: "/admin/account-setting",
    component: AdminAccountSetting,
    protected: true,
  },
  // Admin settings routes
  { path: "/admin/setting", component: AdminSettings, protected: true },

  // Teacher routes
  { path: "/teacher", component: TeacherDashboard, protected: true },
  // Teacher account setting routes
  {
    path: "/teacher/account-setting",
    component: TeacherAccountSetting,
    protected: true,
  },
  // Teacher settings routes
  { path: "/teacher/setting", component: TeacherSettings, protected: true },

  // Not found route
  { path: "*", component: NotFound },
];

export default routesConfig;
