export const sidebarNavs = [
  {
    id: 1,
    icon: "fa-light fa-grid-2",
    iconActive: "fa-regular fa-grid-2",
    title: "Dashboard",
    path: "/teacher",
    show: false,
  },
  {
    id: 3,
    icon: "fa-light fa-book",
    iconActive: "fa-regular fa-book",
    title: "Manage Material",
    path: "/teacher/manage-material",
    show: false,
  },
  {
    id: 4,
    icon: "fa-light fa-chart-line",
    iconActive: "fa-regular fa-chart-line",
    title: "Manage Progress",
    path: "/teacher/manage-progress",
    show: false,
  },
  {
    id: 2,
    icon: "fa-light fa-clipboard-list",
    iconActive: "fa-regular fa-clipboard-list",
    title: "Exam",
    path: "/teacher/assign-exam",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Exam Schedule",
        path: "/teacher/assign-exam/schedule",
      },
      {
        id: 2,
        title: "Assign Exam",
        path: "/teacher/assign-exam/profiles",
      },
      {
        id: 3,
        title: "Exam History",
        path: "/teacher/assign-exam/history",
      },
    ],
  },
  {
    id: 5,
    icon: "fa-light fa-comments",
    iconActive: "fa-regular fa-comments",
    title: "Feedback",
    path: "/teacher/feedback",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Send Feedback",
        path: "/teacher/feedback/send",
      },
      {
        id: 2,
        title: "Receive Feedback",
        path: "/teacher/feedback/receive",
      },
    ],
  },
  {
    id: 6,
    icon: "fa-light fa-user-cog",
    iconActive: "fa-regular fa-user-cog",
    title: "Account Setting",
    path: "/teacher/account-setting",
    show: false,
  },
];
