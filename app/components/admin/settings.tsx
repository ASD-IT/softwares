"use client";
import React from "react";

import { SETTINGS_TABS } from "@/app/lib/constants";

// Components
import ResetPassword from "./reset-password";
import SoftwareSettings from "./softwares/software-settings";
import UserSettings from "./users/user-settings";
import OneDriveConnect from "./onedrive";

interface SettingsProps {
  selectedTab: string;
  onedriveStatus?: any;
}

const Settings: React.FC<SettingsProps> = ({ selectedTab, onedriveStatus }) => {
  return (
    <div className="space-y-4">
      {Object.keys(SETTINGS_TABS).map((key) =>
        selectedTab === key && key === "resetPassword" ? (
          <ResetPassword key={key} />
        ) : selectedTab === key && key === "users" ? (
          <UserSettings key={key} />
        ) : selectedTab === key && (key === "windows" || key === "mac") ? (
          <SoftwareSettings key={key} type={selectedTab} />
        ) : selectedTab === key && key === "onedrive" ? (
          <OneDriveConnect onedriveStatus={onedriveStatus} />
        ) : null
      )}
    </div>
  );
};

export default Settings;
