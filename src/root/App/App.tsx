import { Layout } from "antd";
import { AbilityContext } from "@components/auth/AbilityContext.tsx";
import { Header } from "@core/Layout/Header/Header.tsx";
import { useAbility } from "@/hooks/useAbility.ts";
import { BrowserRouter } from "react-router-dom";
import { Router } from "@root/Router/Router.tsx";
import { useCartSync } from "@hooks/useCartSync.ts";
import { Notifications } from "@components/Notifications/Notifications";

const { Content } = Layout;

export default function App() {
  useCartSync();
  const ability = useAbility();

  return (
    <AbilityContext.Provider value={ability}>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Notifications />
          <Header />
          <Content
            style={{
              padding: "24px",
              background: "#fff",
            }}
          >
            <Router />
          </Content>
        </Layout>
      </BrowserRouter>
    </AbilityContext.Provider>
  );
}
