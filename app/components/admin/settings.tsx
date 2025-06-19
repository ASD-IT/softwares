"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Components
import ResetPassword from "./reset-password";
import SoftwareSettings from "./softwares/software-settings";
import UserSettings from "./users/user-settings";
import OneDriveConnect from "./onedrive";

const SETTINGS_TABS = {
  windows: "Windows Softwares",
  mac: "Mac Softwares",
  users: "Admin / IT Users",
  resetPassword: "Change Password",
  onedrive: "Connect to Onedrive",
};

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("windows");
  // Use if needed to connect to onedrive
  const searchParams = useSearchParams();
  const onedriveStatus = searchParams.get("onedrive");
  useEffect(() => {
    if (onedriveStatus) {
      setSelectedTab("onedrive");
    }
  }, [onedriveStatus]);

  return (
    <div className="space-y-4">
      {/* Settings Tabs */}
      <div className="flex space-x-4 border-b border-b-gray-200">
        {Object.keys(SETTINGS_TABS).map((key, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-black cursor-pointer ${
              selectedTab === key ? "border-b-2 border-blue-500 font-bold" : ""
            }`}
            onClick={() => setSelectedTab(key)}
          >
            {SETTINGS_TABS[key as keyof typeof SETTINGS_TABS]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
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
    </div>
  );
};

export default Settings;
