export const sidebarNavs = [
    {
      id: 1,
      icon: "fa-light fa-grid-2",
      iconActive: "fa-regular fa-grid-2",
      title: "Dashboard",
      path: "/admin",
      show: false,
    },
    {
      id: 2,
      icon: "fa-light fa-file-alt",
      iconActive: "fa-regular fa-file-alt",
      title: "Account",
      path: "/admin/account",
      show: true,
      subNavs: [
        {
          id: 1,
          title: "Accounts Management",
          path: "/admin/account/manage",
        },
        {
          id: 2,
          title: "Create account",
          path: "/admin/account/create",
        },
      ],
    },
    {
      id: 3,
      icon: "fa-light fa-user-cog",
      iconActive: "fa-regular fa-user-cog",
      title: "Account Setting",
      path: "/admin/account-setting",
      show: false,
    },
    {
      id: 4,
      icon: "fa-light fa-cog",
      iconActive: "fa-regular fa-cog",
      title: "Settings",
      path: "/admin/setting",
      show: false,
    }
  ];
  