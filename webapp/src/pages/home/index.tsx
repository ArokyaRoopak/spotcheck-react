import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { useOutlet } from "react-router-dom";
import Header from "./components/header";

const getStoredSideBarStatus = () => {
  return localStorage.getItem("sidebarOpen") === "false" ? false : true;
};
const Home = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSideBar, setShowSideBar] = useState(getStoredSideBarStatus());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const outlet = useOutlet();

  // as both the useffects below, server different purpose, I have them as separate
  // this will help in maintaining the code more readable

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => setShowWelcome(false), 3000);
    setShowWelcome(true);
    return () => clearTimeout(welcomeTimeout);
  }, []);

  const handleSideBarToggle = useCallback(() => {
    setShowSideBar((prev) => !prev);
  }, []);

  return (
    <div className="w-screen h-screen bg-background flex gap-6 justify-center items-center px-1.5 sm:px-2.5 md:px-3 lg:px-4">
      <Sidebar
        isMobile={isMobile}
        isOpen={showSideBar}
        toggleSidebar={handleSideBarToggle}
      />
      <div className="w-full h-full flex flex-col  overflow-hidden max-h-full">
        <Header onToggleSideBar={handleSideBarToggle} />
        <div className="w-full h-full overflow-auto">{outlet}</div>
      </div>
      {showWelcome && (
        <div
          className="fixed bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white 
          px-6 py-3 rounded-lg shadow-lg flex items-center justify-center 
          animate-fade-in-out z-50"
        >
          <span className="text-lg font-semibold">
            Welcome to the Dashboard!
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;
