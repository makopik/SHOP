import { Layout } from "antd";
import { PureAbility } from "@casl/ability";
import { getUserRoles } from "@constants/abilityRoles.ts";
import { AbilityContext } from "@components/auth/AbilityContext.tsx";
import { Header } from "@core/Layout/Header/Header.tsx";

const { Content } = Layout;

export default function App() {
  const ability = new PureAbility(getUserRoles());

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
          {/*пока пусто нет страниц */}
        </Content>
      </Layout>
    </AbilityContext.Provider>
  );
}
