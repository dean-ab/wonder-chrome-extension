import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import { EditTab } from "./EditTab";
import { ReadTab } from "./ReadTab";
import { WriteTab } from "./WriteTab";

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>("edit");

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List grow defaultValue="edit">
        <Tabs.Tab value="edit">Edit</Tabs.Tab>
        <Tabs.Tab value="read">Read</Tabs.Tab>
        <Tabs.Tab value="write" disabled>
          Write (Coming soon)
        </Tabs.Tab>
      </Tabs.List>
      <EditTab />
      <ReadTab />
      <WriteTab />
    </Tabs>
  );
};
