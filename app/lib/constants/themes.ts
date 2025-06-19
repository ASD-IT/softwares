export const bgColors = {
  main: "bg-[#00cdcf]",
  sub: "bg-cyan-200",
  btnHover: "bg-teal-500",
  settHover: "bg-cyan-500",
  loginBg: "bg-gradient-to-r from-[#00cdcf] to-cyan-200",
  general_settings: "bg-[#F9A8D4]",
  general_tab: "bg-teal-700",
};

export const device_bg: any = {
  windows: "bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]",
  mac: "bg-gradient-to-r from-[#00C9FF] to-[#dd3e54]",
  it: "bg-gradient-to-r from-[#00C9FF] to-[#536976]",
  users: "bg-gradient-to-r from-[#00C9FF] to-[#ee9ca7]",
  general: "bg-gray-300",
  changepassword: "bg-gradient-to-r from-[#00C9FF] to-cyan-200",
};

// Color constants
type Color =
  | "success"
  | "danger"
  | "primary"
  | "default"
  | "secondary"
  | "warning";

export const isColor = (color: string | undefined): color is Color => {
  if (color) {
    return [
      "success",
      "danger",
      "primary",
      "default",
      "secondary",
      "warning",
    ].includes(color);
  } else return false;
};
