import { useAbility } from "@/hooks/useAbility.ts";
import { useState } from "react";
import { getAdminRoles, getUserRoles } from "@constants/abilityRoles.ts";
import { Layout, Space, Switch, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export function Header() {
  const ability = useAbility();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const toggleRole = () => {
    const newRole = !isAdmin;
    setIsAdmin(newRole);
    ability.update(newRole ? getAdminRoles() : getUserRoles());
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
