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

  // Detect screen size change
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

  const outlet = useOutlet();

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
        <div className="absolute bottom-0 right-0 popup">
          Welcome to the Dashboard!
        </div>
      )}
    </div>
  );
};

export default Home;
