export const sidebarNavs = [
  {
    id: 1,
    section: "MY STUFF",
    icon: "fa-light fa-book",
    iconActive: "fa-regular fa-book",
    title: "Study Profile",
    path: "/learning",
    show: false,
  },
  {
    id: 2,
    section: "MY STUFF",
    icon: "fa-light fa-calendar-alt",
    iconActive: "fa-regular fa-calendar-alt",
    title: "Exam Schedule",
    path: "/exam-schedule",
    show: false,
  },
  {
    id: 3,
    section: "MY ACCOUNT",
    icon: "fa-light fa-chart-bar",
    iconActive: "fa-regular fa-chart-bar",
    title: "Skill Statistics",
    path: "/skill-statistics",
    show: true,
    subNavs: [
      {
        id: 1,
        title: "Progress Overview",
        path: "/skill-statistics/overview",
      },
      {
        id: 2,
        title: "Detailed Report",
        path: "/skill-statistics/report",
      },
    ],
  },
  {
    id: 4,
    section: "MY ACCOUNT",
    icon: "fa-light fa-history",
    iconActive: "fa-regular fa-history",
    title: "Exam History",
    path: "/exam-history",
    show: false,
  },
  {
    id: 5,
    section: "MY ACCOUNT",
    icon: "fa-light fa-comments",
    iconActive: "fa-regular fa-comments",
    title: "Teacher Feedbacks",
    path: "/teacher-feedbacks",
    show: false,
  },
  {
    id: 6,
    section: "MY ACCOUNT",
    icon: "fa-light fa-user-cog",
    iconActive: "fa-regular fa-user-cog",
    title: "Profile",
    path: "/profile",
    show: false,
  },
];
