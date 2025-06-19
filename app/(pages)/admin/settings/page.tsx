import Settings from "@/app/components/admin/settings";
import { bgColors } from "@/app/lib/constants/themes";

const SettingsPage = () => {
  return (
    <div className={`h-full ${bgColors.sub} text-black rounded-md`}>
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black">Settings</h1>
      </div>

      <Settings />
    </div>
  );
};

export default SettingsPage;
