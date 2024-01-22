import App from "@/App";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import LoginMain from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { routeGenerators } from "@/utils/routeGenerators";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerators(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerators(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerators(studentPaths),
  },
  {
    path: "/login",
    element: <LoginMain />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
