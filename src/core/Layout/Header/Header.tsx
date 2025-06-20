import { Layout, Menu, Space, Switch, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { setRole } from "@core/store/slices/authSlice.ts";
import { ROUTE_PATHS } from "@constants/routePaths.ts";
import { NavLink } from "react-router";

const { Header: AntHeader } = Layout;
const { Title } = Typography;
interface PageLink {
  name: string;
  link: string;
}

const pages: PageLink[] = [{ name: "Товары", link: ROUTE_PATHS.PRODUCTS }];

export function Header() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);

  const isAdmin = role === "admin";

  const toggleRole = () => {
    dispatch(setRole(isAdmin ? "user" : "admin"));
  };

  return (
    <AntHeader
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#001529",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <NavLink
        to={ROUTE_PATHS.MAIN}
        style={({ isActive }) => ({
          pointerEvents: isActive ? "none" : "auto",
        })}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Магазин
        </Title>
      </NavLink>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          background: "transparent",
          borderBottom: "none",
          justifyContent: "center",
          flex: 1,
          display: "flex",
        }}
        selectable={false}
      >
        {pages.map((page) => (
          <Menu.Item key={page.link}>
            <NavLink to={page.link}>{page.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>

      <Space>
        <Switch
          checked={isAdmin}
          onChange={toggleRole}
          checkedChildren="Админ"
          unCheckedChildren="Пользователь"
        />
      </Space>
    </AntHeader>
  );
}
