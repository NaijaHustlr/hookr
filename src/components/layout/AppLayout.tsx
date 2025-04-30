
import React from "react";
import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const showNavigation = !hideNavigation && location.pathname !== "/auth";
  
  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark">
      <main className="flex-1 pb-[4.5rem]">
        {children}
      </main>
      {showNavigation && <NavigationBar />}
    </div>
  );
};

export default AppLayout;
