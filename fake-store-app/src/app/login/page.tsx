"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const LoginPage: React.FC<undefined> = () => {
  const {  } = useAuth();

  return (
    <div>
        Login
    </div>
  );
};

export default LoginPage;
