
import React from "react";
import NavigationBar from "./NavigationBar";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const showNavigation = !["/splash", "/auth"].includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark">
      <main className="flex-1 pb-[4.5rem]">
        <Outlet />
      </main>
      {showNavigation && <NavigationBar />}
    </div>
  );
};

export default AppLayout;
