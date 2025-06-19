"use client";
import React from "react";

export default function OneDriveConnect({ onedriveStatus }: any) {
  const handleConnect = () => {
    window.location.href = "/api/onedrive/connect";
  };

  const getMessage = () => {
    switch (onedriveStatus) {
      case "connected":
        return "OneDrive connected successfully!";
      case "codemissing":
        return "Authorization code missing. Please try connecting again.";
      case "tokenerror":
        return "Failed to retrieve token from Microsoft. Try again later.";
      case "dberror":
        return "Error saving token to database. Contact support.";
      default:
        return "";
    }
  };

  if (onedriveStatus) {
    return (
      <div className="p-4">
        <p className="text-red-500">{getMessage()}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-x-6">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleConnect}
      >
        Connect OneDrive
      </button>
    </div>
  );
}
