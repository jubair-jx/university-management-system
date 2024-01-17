import AdminDashboard from "@/pages/Admin/AdminDashboard";
import CreateAdmin from "@/pages/Admin/CreateAdmin";
import CreateFaculy from "@/pages/Admin/CreateFaculy";
import CreateStudent from "@/pages/Admin/CreateStudent";
import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

export const adminSidebarItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: <CreateFaculy />,
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: <CreateStudent />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Course",
        path: "/admin/offered-course",
        element: <CreateAdmin />,
      },
    ],
  },
];

//This is Programmatically way
export const adminRoutes = adminSidebarItems.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

//This HardCoded way
// export const adminPaths = [
//   {
//     index: true,
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculy />,
//   },
// ];
