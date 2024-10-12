export const sidebarNavs = [
    {
      id: 1,
      icon: "fa-light fa-grid-2",
      iconActive: "fa-regular fa-grid-2",
      title: "Dashboard",
      path: "/manager",
      show: false,
    },
    {
      id: 2,
      icon: "fa-light fa-book-open",
      iconActive: "fa-regular fa-book-open",
      title: "Learning Material",
      show: true,
      subNavs: [
        {
          id: 1,
          title: "Overview",
          path: "/manager/learning-material/overview",
        },
        {
          id: 2,
          title: "Censor Unit",
          path: "/manager/learning-material/censor",
        },
        {
          id: 3,
          title: "Feedback Unit",
          path: "/manager/learning-material/feedback",
        }
      ],
    },
    {
      id: 3,
      icon: "fa-light fa-question-circle",
      iconActive: "fa-regular fa-question-circle",
      title: "Question Exam",
      show: true,
      path: "/manager/question-bank",
      subNavs: [
        {
          id: 1,
          title: "Question Bank",
          path: "/manager/question-bank/bank",
        },
        {
          id: 2,
          title: "Censor Question",
          path: "/manager/question-bank/censor",
        },
        {
            id: 3,
            title: "Feedback Question",
            path: "/manager/question-bank/feedback",
          },
      ],
    },
    {
      id: 4,
      icon: "fa-light fa-seal-question",
      iconActive: "fa-regular fa-seal-question",
      title: "Question Quizz",
      path: "/manager/question-quizz",
      show: true,
      subNavs: [
        {
          id: 1,
          title: "Quizz Bank",
          path: "/manager/question-quizz/bank",
        },
        {
          id: 2,
          title: "Censor Quizz Question",
          path: "/manager/question-quizz/censor",
        },
        {
            id: 3,
            title: "Feedback Quizz Question",
            path: "/manager/question-quizz/feedback",
          },
      ],
    },
    {
      id: 5,
      icon: "fa-light fa-file-alt",
      iconActive: "fa-regular fa-file-alt",
      title: "Exam",
      path: "/manager/exams",
      show: true,
      subNavs: [
        {
          id: 1,
          title: "All Exams",
          path: "/manager/exams/overview",
        },
        {
          id: 2,
          title: "Censor Exam",
          path: "/manager/exams/censor",
        },
        {
            id: 3,
            title: "Censor Exam Score",
            path: "/manager/exams/score/censor",
        },
        {
          id: 4,
          title: "Censor Exam Structure",
          path: "/manager/exams/structure/censor",
        },
        {
          id: 5,
          title: "Feedback Exam",
          path: "/manager/exams/feedback",
        },
      ],
    },
    {
      id: 6,
      icon: "fa-light fa-clipboard-check",
      iconActive: "fa-regular fa-clipboard-check",
      title: "Practice Test",
      path: "/manager/practice",
      show: true,
      subNavs: [
        {
          id: 1,
          title: "All Practices",
          path: "/manager/practice/overview",
        },
      ],
    },
    {
      id: 7,
      icon: "fa-light fa-comments",
      iconActive: "fa-regular fa-comments",
      title: "Feedback",
      path: "/manager/feedback",
      show: false,
    },
    {
      id: 8,
      icon: "fa-light fa-user-cog",
      iconActive: "fa-regular fa-user-cog",
      title: "Account Setting",
      path: "/manager/account-setting",
      show: false,
    },
    {
      id: 9,
      icon: "fa-light fa-cog",
      iconActive: "fa-regular fa-cog",
      title: "Settings",
      path: "/manager/setting",
      show: false,
    }
  ];
  