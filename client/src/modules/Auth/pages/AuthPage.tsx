import { AuthForm } from "@modules/Auth/components/AuthForm";
import { TAuthFormType } from "@modules/Auth/types";
import { Card } from "@components/Card";
import { TabProvider, TabList, Tab, TabPanel } from '@gravity-ui/uikit';
import { FC, useState } from "react";

export const AuthPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TAuthFormType>(TAuthFormType.signIn);

  return (
    <div>
      <Card>
        <TabProvider value={activeTab} onUpdate={(value) => setActiveTab(value as TAuthFormType)}>
          <TabList>
            <Tab value={TAuthFormType.signIn}>Войти</Tab>
            <Tab value={TAuthFormType.signUp}>Создать аккаунт</Tab>
          </TabList>
          <div>
            <TabPanel value={TAuthFormType.signIn}>
              <AuthForm type={TAuthFormType.signIn} />
            </TabPanel>
            <TabPanel value={TAuthFormType.signUp}>
              <AuthForm type={TAuthFormType.signUp} />
            </TabPanel>
          </div>
        </TabProvider>
      </Card>
    </div>
  );
};
