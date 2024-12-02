import ExamViewResult from "~/components/TrialExam/TrialExamDetail/ExamView/ExamViewResult";
import Account from "~/pages/Admin/Account";
import CreateAccount from "~/pages/Admin/Account/CreateAccount";
import AdminAccountSetting from "~/pages/Admin/AdminAccountSetting";
import AdminDashboard from "~/pages/Admin/AdminDashboard";
import AdminSettings from "~/pages/Admin/AdminSettings";
import Congratulation from "~/pages/Congratulation";
import About from "~/pages/Landing/About";
import Contact from "~/pages/Landing/Contact";
import Home from "~/pages/Landing/Home";
import News from "~/pages/Landing/News";
import ManagerAccountSetting from "~/pages/Manager/ManagerAccountSetting";
import ManagerDashboard from "~/pages/Manager/ManagerDashboard";
import ManagerExam from "~/pages/Manager/ManagerExam";
import ExamCensor from "~/pages/Manager/ManagerExam/ExamCensor";
import FeedbackExam from "~/pages/Manager/ManagerExam/FeedbackExam";
import ManagerFeedback from "~/pages/Manager/ManagerFeedback";
import ManagerLearningMaterial from "~/pages/Manager/ManagerLearningMaterial";
import FeedbackLearningMaterial from "~/pages/Manager/ManagerLearningMaterial/FeedbackLearningMaterial";
import LearningMaterialCensor from "~/pages/Manager/ManagerLearningMaterial/LearningMaterialCensor";
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
import ExamFeedback from "~/pages/Staff/Exam/ExamFeedback";
import ExamScore from "~/pages/Staff/Exam/ExamScore";
import ExamStructure from "~/pages/Staff/Exam/ExamStructure";
import LearningMaterial from "~/pages/Staff/LearningMaterial";
import LearningMaterialCreateAss from "~/pages/Staff/LearningMaterial/LearningMaterialCreateAss";
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
import QuizzFeedback from "~/pages/Staff/QuestionQuizz/QuizzFeedback/QuizzFeedback";
import Settings from "~/pages/Staff/Settings";
import StaffFeedback from "~/pages/Staff/StaffFeedback";
import StaffReceiveFeedback from "~/pages/Staff/StaffReceiveFeedback";
import Students from "~/pages/Staff/Students";
import StudyProfile from "~/pages/Staff/Students/StudyProfile";
import Teachers from "~/pages/Staff/Teachers";
import AssignStudents from "~/pages/Staff/Teachers/AssignStudents";
import DetailedReport from "~/pages/Student/DetailedReport";
import ExamHistory from "~/pages/Student/ExamHistory";
import ExamSchedule from "~/pages/Student/ExamSchedule";
import Feedback from "~/pages/Student/Feedback";
import Learning from "~/pages/Student/Learning";
import LearningPart from "~/pages/Student/LearningPart";
import LearningPartDetail from "~/pages/Student/LearningPartDetail";
import LearningPartUnitTest from "~/pages/Student/LearningPartUnitTest";
import LearningProcess from "~/pages/Student/LearningProcess";
import StudentProfile from "~/pages/Student/Profile";
import ProgressOverview from "~/pages/Student/ProgressOverview";
import ReceiveFeedback from "~/pages/Student/ReceiveFeedback";
import AssignExam from "~/pages/Teacher/AssignExam";
import AssignExamSchedule from "~/pages/Teacher/AssignExam/ExamSchedule";
import ManageMaterial from "~/pages/Teacher/ManageMaterial";
import ManageProgress from "~/pages/Teacher/ManageProgress";
import TeacherAccountSetting from "~/pages/Teacher/TeacherAccountSetting";
import TeacherDashboard from "~/pages/Teacher/TeacherDashboard";
import TeacherFeedback from "~/pages/Teacher/TeacherFeedback";
import TeacherReceiveFeedback from "~/pages/Teacher/TeacherReceiveFeedback";
import TeacherSettings from "~/pages/Teacher/TeacherSettings";
import TrialExam from "~/pages/TrialExam";
import TrialExamDetail from "~/pages/TrialExam/TrialExamDetail";
import Unauthorized from "~/pages/Unauthorized";
import QuestionDistribution from "../pages/Manager/ManagerExam/QuestionDistribution";
import FeedbackQuestionExam from "../pages/Manager/ManagerQuestionExam/FeedbackQuestionExam";
import FeedbackQuestionQuizz from "../pages/Manager/ManagerQuestionQuizz/FeedbackQuestionQuizz";

const routesConfig = [
  // Testing
  { path: "/test", component: ExamViewResult },
  // Landing page routes
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  { path: "/unauthorized", component: Unauthorized, protected: true },

  // Trial Exam routes
  {
    path: "/trial-exam",
    component: TrialExam,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/take-exam/:examId",
    component: TrialExamDetail,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/trial-exam/:examId",
    component: TrialExamDetail,
    protected: true,
    roles: ["Student"],
  },
  // Student routes
  {
    path: "/congratulation",
    component: Congratulation,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning-progress",
    component: Learning,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning",
    component: LearningProcess,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/exam-schedule",
    component: ExamSchedule,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning/:slug",
    component: LearningPart,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning/:slug/:sectionId",
    component: LearningPart,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning/:slug/:sectionId/:unitAreaId/:lessonId",
    component: LearningPartDetail,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/learning/:slug/:unitId/:unitProgressId/unit-test",
    component: LearningPartUnitTest,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/profile",
    component: StudentProfile,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/feedback/send",
    component: Feedback,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/feedback/receive",
    component: ReceiveFeedback,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/skill-statistics/overview",
    component: ProgressOverview,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/skill-statistics/report",
    component: DetailedReport,
    protected: true,
    roles: ["Student"],
  },
  {
    path: "/exam-history",
    component: ExamHistory,
    protected: true,
    roles: ["Student"],
  },

  // Staff routes
  { path: "/staff", component: Dashboard, protected: true, roles: ["Staff"] },
  // Staff learning material routes
  {
    path: "/staff/learning-material/overview",
    component: LearningMaterial,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create",
    component: LearningMaterialCreateDetails,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/topics",
    component: LearningMaterialCreateTopic,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/topics/:unitId",
    component: LearningMaterialCreateTopic,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/lessons",
    component: LearningMaterialCreateLesson,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/lessons/:unitId",
    component: LearningMaterialCreateLesson,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/lessons/:unitId/:lessonId",
    component: LearningMaterialCreateLesson,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/practices",
    component: LearningMaterialCreateAss,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/practices/:unitId",
    component: LearningMaterialCreateAss,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/publish",
    component: LearningMaterialPublish,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/create/publish/:unitId/:lessonId",
    component: LearningMaterialPublish,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/learning-material/feedback",
    component: LearningMaterialFeedback,
    protected: true,
    roles: ["Staff"],
  },
  // Staff question bank routes
  {
    path: "/staff/question-bank/bank",
    component: QuestionExam,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/question-bank/create",
    component: QuestionExamCreate,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/question-bank/feedback",
    component: QuestionFeedback,
    protected: true,
    roles: ["Staff"],
  },
  // Staff quizz question bank routes
  {
    path: "/staff/question-quizz/bank",
    component: QuestionQuizz,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/question-quizz/create",
    component: QuestionQuizzCreate,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/question-quizz/feedback",
    component: QuizzFeedback,
    protected: true,
    roles: ["Staff"],
  },
  // Staff exam routes
  {
    path: "/staff/exams/overview",
    component: Exam,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/exams/create",
    component: ExamCreate,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/exams/feedback",
    component: ExamFeedback,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/exams/structure",
    component: ExamStructure,
    protected: true,
    roles: ["Staff"],
  },

  // Staff practice routes
  {
    path: "/staff/practice/overview",
    component: Practice,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/practice/create",
    component: PracticeCreate,
    protected: true,
    roles: ["Staff"],
  },
  // Staff manage students routes
  {
    path: "/staff/students/study-profile",
    component: Students,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/students/assign-students",
    component: StudyProfile,
    protected: true,
    roles: ["Staff"],
  },

  // Staff manage teacher routes
  {
    path: "/staff/teachers/manage",
    component: Teachers,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/teachers/assign-students",
    component: AssignStudents,
    protected: true,
    roles: ["Staff"],
  },
  // Staff manage feedback routes
  {
    path: "/staff/feedback/send",
    component: StaffFeedback,
    protected: true,
    roles: ["Staff"],
  },
  {
    path: "/staff/feedback/receive",
    component: StaffReceiveFeedback,
    protected: true,
    roles: ["Staff"],
  },
  // Staff account setting routes
  {
    path: "/staff/account-setting",
    component: AccountSetting,
    protected: true,
    roles: ["Staff"],
  },
  // Staff settings routes
  {
    path: "/staff/setting",
    component: Settings,
    protected: true,
    roles: ["Staff"],
  },

  // Manger routes
  {
    path: "/manager",
    component: ManagerDashboard,
    protected: true,
    roles: ["Manager"],
  },
  // Manger learning material routes
  {
    path: "/manager/learning-material/overview",
    component: ManagerLearningMaterial,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/learning-material/censor",
    component: LearningMaterialCensor,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/learning-material/feedback",
    component: FeedbackLearningMaterial,
    protected: true,
    roles: ["Manager"],
  },
  // Manger question bank routes
  {
    path: "/manager/question-bank/bank",
    component: ManagerQuestionExam,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/question-bank/censor",
    component: QuestionExamCensor,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/question-bank/feedback",
    component: FeedbackQuestionExam,
    protected: true,
    roles: ["Manager"],
  },
  // Manger quizz question bank routes
  {
    path: "/manager/question-quizz/bank",
    component: ManagerQuestionQuizz,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/question-quizz/censor",
    component: QuestionQuizzCensor,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/question-quizz/feedback",
    component: FeedbackQuestionQuizz,
    protected: true,
    roles: ["Manager"],
  },
  // Manger exam routes
  {
    path: "/manager/exams/overview",
    component: ManagerExam,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/exams/censor",
    component: ExamCensor,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/exams/score/distribution",
    component: ExamScore,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/exams/question/distribution",
    component: QuestionDistribution,
    protected: true,
    roles: ["Manager"],
  },
  {
    path: "/manager/exams/feedback",
    component: FeedbackExam,
    protected: true,
    roles: ["Manager"],
  },
  // Manger practice routes
  // Manger manage feedback routes
  {
    path: "/manager/feedback",
    component: ManagerFeedback,
    protected: true,
    roles: ["Manager"],
  },
  // Manger account setting routes
  {
    path: "/manager/account-setting",
    component: ManagerAccountSetting,
    protected: true,
    roles: ["Manager"],
  },
  // Manger settings routes
  {
    path: "/manager/setting",
    component: ManagerSettings,
    protected: true,
    roles: ["Manager"],
  },

  // Admin routes
  {
    path: "/admin",
    component: AdminDashboard,
    protected: true,
    roles: ["Admin"],
  },
  // Admin account routes
  {
    path: "/admin/account/manage",
    component: Account,
    protected: true,
    roles: ["Admin"],
  },
  {
    path: "/admin/account/create",
    component: CreateAccount,
    protected: true,
    roles: ["Admin"],
  },
  // Admin account setting routes
  {
    path: "/admin/account-setting",
    component: AdminAccountSetting,
    protected: true,
    roles: ["Admin"],
  },
  // Admin settings routes
  {
    path: "/admin/setting",
    component: AdminSettings,
    protected: true,
    roles: ["Admin"],
  },

  // Teacher routes
  {
    path: "/teacher",
    component: TeacherDashboard,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher assign exam routes
  {
    path: "/teacher/assign-exam/schedule",
    component: AssignExamSchedule,
    protected: true,
    roles: ["Teacher"],
  },
  {
    path: "/teacher/assign-exam/profiles",
    component: AssignExam,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher manage material routes
  {
    path: "/teacher/manage-material",
    component: ManageMaterial,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher manage progress routes
  {
    path: "/teacher/manage-progress",
    component: ManageProgress,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher account setting routes
  {
    path: "/teacher/account-setting",
    component: TeacherAccountSetting,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher feedback routes
  {
    path: "/teacher/feedback/send",
    component: TeacherFeedback,
    protected: true,
    roles: ["Teacher"],
  },
  {
    path: "/teacher/feedback/receive",
    component: TeacherReceiveFeedback,
    protected: true,
    roles: ["Teacher"],
  },
  // Teacher settings routes
  {
    path: "/teacher/setting",
    component: TeacherSettings,
    protected: true,
    roles: ["Teacher"],
  },

  // Not found route
  { path: "*", component: NotFound },
];

export default routesConfig;
