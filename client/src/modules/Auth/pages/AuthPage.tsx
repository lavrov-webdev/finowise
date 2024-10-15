import { Tabs } from "@gravity-ui/uikit";
import { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { TAuthFormType } from "../types";

export const AuthPage = () => {
  const [activeTabId, setActiveTabId] = useState<TAuthFormType>(
    TAuthFormType.signIn,
  );

  return (
    <div style={{ maxWidth: 500 }}>
      <Tabs
        activeTab={activeTabId}
        onSelectTab={(value) => setActiveTabId(value as TAuthFormType)}
        items={[
          { id: TAuthFormType.signIn, title: "Войти" },
          { id: TAuthFormType.signUp, title: "Создать аккаунт" },
        ]}
      />
      <AuthForm type={activeTabId} />
    </div>
  );
};
