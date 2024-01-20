import { adminPaths } from "@/routes/admin.routes";
import { facultyPaths } from "@/routes/faculty.routes";
import { studentPaths } from "@/routes/student.routes";
import { sideBarItemsGenerators } from "@/utils/sideBarItemsGenerators";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const SidebarLayout = () => {
  const role = "student";
  let sideItems;
  switch (role) {
    case userRole.ADMIN:
      sideItems = sideBarItemsGenerators(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideItems = sideBarItemsGenerators(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sideItems = sideBarItemsGenerators(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <div className=" p-2 text-center font-semibold text-lg text-white">
        <h1>University Management System</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideItems}
      />
    </Sider>
  );
};

export default SidebarLayout;
