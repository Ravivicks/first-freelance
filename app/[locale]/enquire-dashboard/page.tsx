import { Dashboard } from "@/components/EnquiryTable";
import { LoginForm } from "@/components/Login";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <TooltipProvider>
        <Dashboard />
      </TooltipProvider>
    </div>
  );
};

export default page;
