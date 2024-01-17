import { Layout, Menu, MenuProps, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to="/admin">Dashboard</NavLink>,
  },
  {
    key: "2",
    label: "Home",
  },
  {
    key: "3",
    label: "User Management",
    children: [
      {
        key: "31",
        label: <NavLink to="create-admin">Create Admin</NavLink>,
      },
      {
        key: "41",
        label: <NavLink to="create-faculty">Create Faculty</NavLink>,
      },
      {
        key: "51",
        label: <NavLink to="create-student">Create Student</NavLink>,
      },
    ],
  },
  {
    key: "4",
    label: "Courses",
  },
  {
    key: "5",
    label: "",
  },
];

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
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
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
