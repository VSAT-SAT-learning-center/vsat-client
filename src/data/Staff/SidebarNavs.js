export const sidebarNavs = [
  {
    id: 1,
    icon: "fa-light fa-grid-2",
    iconActive: "fa-regular fa-grid-2",
    title: "Dashboard",
    path: "/staff",
    show: false,
  },
  {
    id: 2,
    icon: "fa-light fa-book-open",
    iconActive: "fa-regular fa-book-open",
    title: "Learning Material",
    path: "/staff/learning-material",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Overview",
        path: "/staff/learning-material/overview",
      },
      {
        id: 2,
        title: "Create Material",
        path: "/staff/learning-material/create",
      },
      {
        id: 3,
        title: "Feedback Material",
        path: "/staff/learning-material/feedbacks",
      },
    ],
  },
  {
    id: 3,
    icon: "fa-light fa-question-circle",
    iconActive: "fa-regular fa-question-circle",
    title: "Question Exam",
    show: true,
    path: "/staff/question-bank",
    subNavs: [
      {
        id: 1,
        title: "Question Bank",
        path: "/staff/question-bank/bank",
      },
      {
        id: 2,
        title: "Create Question",
        path: "/staff/question-bank/create",
      },
      {
        id: 3,
        title: "Feedback Question",
        path: "/staff/question-bank/feedback",
      },
    ],
  },
  {
    id: 4,
    icon: "fa-light fa-seal-question",
    iconActive: "fa-regular fa-seal-question",
    title: "Question Quizz",
    path: "/staff/question-quizz",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Quiz Bank",
        path: "/staff/question-quizz/bank",
      },
      {
        id: 2,
        title: "Create Quiz Question",
        path: "/staff/question-quizz/create",
      },
      {
        id: 3,
        title: "Feedback Quiz Question",
        path: "/staff/question-quizz/feedback",
      },
    ],
  },
  {
    id: 5,
    icon: "fa-light fa-file-alt",
    iconActive: "fa-regular fa-file-alt",
    title: "Exam",
    path: "/staff/exams",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "All Exams",
        path: "/staff/exams/overview",
      },
      {
        id: 2,
        title: "Create Exam",
        path: "/staff/exams/create",
      },
      {
        id: 3,
        title: "Feedback Exam",
        path: "/staff/exams/feedback",
      },
      {
        id: 4,
        title: "Exam Structure",
        path: "/staff/exams/structure",
      },
    ],
  },
  // {
  //   id: 6,
  //   icon: "fa-light fa-clipboard-check",
  //   iconActive: "fa-regular fa-clipboard-check",
  //   title: "Practice Test",
  //   path: "/staff/practice",
  //   show: true,
  //   subNavs: [
  //     {
  //       id: 1,
  //       title: "All Practices",
  //       path: "/staff/practice/overview",
  //     },
  //     {
  //       id: 2,
  //       title: "Create Practice",
  //       path: "/staff/practice/create",
  //     },
  //   ],
  // },
  {
    id: 7,
    icon: "fa-light fa-users",
    iconActive: "fa-regular fa-users",
    title: "Students",
    path: "/staff/students",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Manage Study Profile",
        path: "/staff/students/study-profile",
      },
      {
        id: 2,
        title: "Assign Students",
        path: "/staff/students/assign-students",
      },
    ],
  },
  {
    id: 8,
    icon: "fa-light fa-chalkboard-teacher",
    iconActive: "fa-regular fa-chalkboard-teacher",
    title: "Teachers",
    path: "/staff/teachers",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Manage Teachers",
        path: "/staff/teachers/manage",
      },
      // {
      //   id: 2,
      //   title: "Assign Students",
      //   path: "/staff/teachers/assign-students",
      // },
    ],
  },
  {
    id: 9,
    icon: "fa-light fa-comments",
    iconActive: "fa-regular fa-comments",
    title: "Feedback",
    path: "/staff/feedback",
    show: false,
  },
  {
    id: 10,
    icon: "fa-light fa-user-cog",
    iconActive: "fa-regular fa-user-cog",
    title: "Account Setting",
    path: "/staff/account-setting",
    show: false,
  },
  {
    id: 11,
    icon: "fa-light fa-cog",
    iconActive: "fa-regular fa-cog",
    title: "Settings",
    path: "/staff/setting",
    show: false,
  },
];
