import { Layout, Space, Switch, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { setRole } from "@core/store/slices/authSlice.ts";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

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
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Магазин
      </Title>
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
