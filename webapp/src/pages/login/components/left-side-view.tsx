import React, { useEffect, useState } from "react";

const words = [
  {
    label: "Discover",
    value:
      "Assess the health status of employees, take proactive and preventive actions, and create relevant wellness plans",
  },
  {
    label: "Engage",
    value:
      "Engage employees with a variety of fitness programs and workshops that work for them prior to building an effective long-term wellness plan",
  },
  {
    label: "Collaborate",
    value:
      "Design collaborations with stakeholders, initiate and manage incentive programs access network of experts and marketplace",
  },
  {
    label: "Sustain",
    value:
      "Build sustained programs for wellness with competitions, gamification and other activities and incentives for deeper participation",
  },
];
const LeftSideView = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span
        className="text-6xl xl:text-8xl font-bold text-primary font-noto animate-fade-in text-center"
        style={{
          background: "linear-gradient(180deg, #124666 0%, #12738A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SPOTCHECK
      </span>
      <span
        className="text-3xl font-bold text-primary font-noto animate-fade-in text-center"
        style={{
          background: "linear-gradient(180deg, #124666 0%, #32738A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ASSESSMENT
      </span>

      <div className="w-[80%] h-[254px] flex gap-1 p-1 rounded-md mt-6">
        {words.map((word, index) => (
          <div
            key={word?.label}
            className={`h-full flex-1 w-max   overflow-hidden cursor-pointer rounded-2xl border-4 border-[#ff5a91] flex flex-col justify-center items-center transition-all duration-500 ${
              index === activeIndex
                ? " w-[430px]  bg-[#ff568e]"
                : " max-w-[60px]"
            }`}
          >
            <span
              className={`px-2 text-center uppercase  tracking-wide transition-all duration-500 font-noto  ${
                index === activeIndex
                  ? "rotate-0 text-4xl font-semibold text-white"
                  : "-rotate-90 text-2xl font-bold text-[#ff568e]"
              }`}
            >
              {word?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideView;
