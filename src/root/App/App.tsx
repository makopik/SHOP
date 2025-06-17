import { Layout, Spin } from "antd";
import { AbilityContext } from "@components/auth/AbilityContext.tsx";
import { Header } from "@core/Layout/Header/Header.tsx";
import { PermissionDemo } from "@pages/PermissionDemo.tsx";
import { useAbility } from "@/hooks/useAbility.ts";

const { Content } = Layout;

export default function App() {
  const ability = useAbility();

  if (!ability) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="Загрузка прав доступа..." />
      </Layout>
    );
  }

  return (
    <AbilityContext.Provider value={ability}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content
          style={{
            padding: "24px",
            background: "#fff",
          }}
        >
          <PermissionDemo />
          {/*пока пусто нет страниц */}
        </Content>
      </Layout>
    </AbilityContext.Provider>
  );
}
