"use client";
import React, { useState } from "react";
import Image from "next/image";

// Hooks / Queries
import useUserSessionHook from "@/app/hooks/useUserSessionHook";
import { changePassword } from "@/app/lib/queries/users";

// Components
import { InputWithIcon } from "@/app/ui/inputs";

const ResetPassword: React.FC = () => {
  const { userId } = useUserSessionHook();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPwd, setShowPwd] = useState({
    showNew: false,
    showConfirm: false,
  });
  const { showNew, showConfirm } = showPwd;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = userId && (await changePassword(userId, newPassword));

      if (response && response.error) {
        setError(response.error);
        return;
      }

      setSuccess("Password reset successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to reset password.");
    }
  };

  return (
    <div className="mt-2 rounded-md bg-gradient-to-r from-[#00C9FF] to-cyan-200 w-full h-[75vh] md:h-[84vh] flex md:items-center md:justify-center px-2">
      <div className="w-[500px] md:mx-auto md:my-44 my-8 p-6 bg-white rounded shadow">
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            label="New Password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            handleChange={(e) => setNewPassword(e.target.value)}
            required
            icon={
              <Image
                src={
                  showNew
                    ? "/images/eye-blue-open.svg"
                    : "/images/eye-blue-close.svg"
                }
                alt={showNew ? "open" : "closed"}
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() =>
                  setShowPwd((prev) => ({ ...prev, showNew: !showNew }))
                }
              />
            }
          />
          <InputWithIcon
            label="Confirm New Password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={
              <Image
                src={
                  showConfirm
                    ? "/images/eye-blue-open.svg"
                    : "/images/eye-blue-close.svg"
                }
                alt={showConfirm ? "open" : "closed"}
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() =>
                  setShowPwd((prev) => ({ ...prev, showConfirm: !showConfirm }))
                }
              />
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="mt-2 rounded-md bg-gradient-to-r from-[#00C9FF] to-cyan-200 w-full h-[84vh] flex md:items-center md:justify-center px-2">
  //     <div className="w-[500px] md:mx-auto md:my-44 my-8 p-6 bg-white rounded shadow h-auto">
  //       {error && <div className="text-red-600 text-center">{error}</div>}
  //       {success && <div className="text-green-600 text-center">{success}</div>}

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <InputWithIcon
  //           label="New Password"
  //           type={showNew ? "text" : "password"}
  //           value={newPassword}
  //           handleChange={(e) => setNewPassword(e.target.value)}
  //           required
  //           icon={
  //             <Image
  //               src={
  //                 showNew
  //                   ? "/images/eye-blue-open.svg"
  //                   : "/images/eye-blue-close.svg"
  //               }
  //               alt={showNew ? "open" : "closed"}
  //               width={20}
  //               height={20}
  //               className="cursor-pointer"
  //               onClick={() =>
  //                 setShowPwd((prev) => ({ ...prev, showNew: !showNew }))
  //               }
  //             />
  //           }
  //         />
  //         <InputWithIcon
  //           label="Confirm New Password"
  //           type={showConfirm ? "text" : "password"}
  //           value={confirmPassword}
  //           handleChange={(e) => setConfirmPassword(e.target.value)}
  //           required
  //           icon={
  //             <Image
  //               src={
  //                 showConfirm
  //                   ? "/images/eye-blue-open.svg"
  //                   : "/images/eye-blue-close.svg"
  //               }
  //               alt={showConfirm ? "open" : "closed"}
  //               width={20}
  //               height={20}
  //               className="cursor-pointer"
  //               onClick={() =>
  //                 setShowPwd((prev) => ({ ...prev, showConfirm: !showConfirm }))
  //               }
  //             />
  //           }
  //         />

  //         <button
  //           type="submit"
  //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
  //         >
  //           Reset Password
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default ResetPassword;
