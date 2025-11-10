"use client";
import { useEffect, useState } from "react";

// Constants
import { device_bg } from "@/app/lib/constants/themes";
import { SETTINGS_TABS } from "@/app/lib/constants";

// Components
import Settings from "@/app/components/admin/settings";
import { useSearchParams } from "next/navigation";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("windows");
  // Use if needed to connect to onedrive - pass onedriveStatus to Settings component
  const searchParams = useSearchParams();
  const onedriveStatus = searchParams.get("onedrive");
  useEffect(() => {
    if (onedriveStatus) {
      setSelectedTab("onedrive");
    }
  }, [onedriveStatus]);

  return (
    <div className={`h-full bg-white text-black flex flex-col px-3 lg:px-2`}>
      {/* Header */}
      <div className={`${device_bg.users} rounded-md`}>
        <div className="w-full flex flex-row items-center justify-between p-4">
          <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-black">
            Settings
          </h1>
        </div>
        {/* Settings Tabs */}
        <div className="flex space-x-4 px-2 overflow-x-auto">
          {Object.keys(SETTINGS_TABS).map((key, index) => (
            <button
              key={index}
              className={`py-2 px-4 text-black cursor-pointer whitespace-nowrap ${
                selectedTab === key
                  ? "border-b-2 border-pink-500 font-bold shadow-inner rounded-md brightness-50"
                  : ""
              } hover:border-b-2 hover:border-pink-500`}
              onClick={() => setSelectedTab(key)}
            >
              {SETTINGS_TABS[key as keyof typeof SETTINGS_TABS]}
            </button>
          ))}
        </div>
      </div>

      <Settings selectedTab={selectedTab} />
    </div>
  );
};

export default SettingsPage;
