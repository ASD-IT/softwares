export const classes = {
  inputBox:
    "w-full p-2 rounded-lg bg-white border border-[#24305E] focus:outline-0 text-black",
};

export const SETTINGS_TABS = {
  windows: "Windows Softwares",
  mac: "Mac Softwares",
  users: "Admin / IT Users",
  resetPassword: "Change Password",
  // onedrive: "Connect to Onedrive",
};

export const USER_CATEGORIES = [
  "ASD Staff",
  "Elementary",
  "Middle School",
  "High School",
  "IT",
];

export const USER_CATEGORY_IMAGE: Record<string, string> = {
  IT: "/images/admin.jpg",
  Elementary: "/images/elementary.jpg",
  "Middle School": "/images/middle.jpg",
  "High School": "/images/high.jpg",
  "ASD Staff": "/images/staff.jpg",
};

export const USER_CATEGORY_SHORT_MAP: Record<string, string> = {
  IT: "IT",
  Elementary: "EL",
  "Middle School": "MS",
  "High School": "HS",
  "ASD Staff": "ST",
};

// Accepted File types
export const iconFiles = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];
export const softwareFiles = [
  ".exe",
  ".msi",
  ".dmg",
  ".pkg",
  ".zip",
  ".command",
  ".sh",
  ".app",
  ".bin",
];

// Software table columns
export const SOFTWARES_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "instructions", label: "Instructions" },
  { key: "image_url", label: "Icon" },
  { key: "file_url", label: "File" },
  { key: "user_category", label: "User Category" },
  { key: "actions", label: "Actions" },
];

export const USER_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "username", label: "UserName" },
  { key: "role", label: "Role" },
  { key: "actions", label: "Actions" },
];
