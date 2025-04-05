import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
