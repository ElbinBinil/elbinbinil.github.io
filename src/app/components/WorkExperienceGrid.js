import { useEffect, useState } from "react";
import { useTrail, animated, easings } from "@react-spring/web";
import { useWorkExperience } from "../../hooks/useFirestore";
import { WorkExperienceTimeline } from "./Timeline";
import { GRIDS } from "../constants";
import "./work-experience.css";

// Simple LoadingSpinner component
const LoadingSpinner = ({ size = "large" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`${sizeClasses[size]} border-4 border-[#2a9d8f]/30 border-t-[#E9C46A] rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default function WorkExperienceGrid({ setCurrentGrid, animatedStyles }) {
  const { workExperience, loading, error } = useWorkExperience();
  const [nameIdx, setNameIdx] = useState(0);
  const name = "Work Experience".split("");

  const [subheadingIdx, setSubheadingIdx] = useState(0);
  const subheading = "My professional journey and career milestones".split("");

  useEffect(() => {
    const id = setInterval(() => {
      if (nameIdx < name.length) {
        setNameIdx(nameIdx + 1);
      }
      if (subheadingIdx < subheading.length) {
        setSubheadingIdx(subheadingIdx + 1);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  });

  const trails = useTrail(2, {
    from: { scale: 0 },
    to: { scale: 1 },
    leave: { scale: 1 },
    config: {
      easing: easings.easeInBack,
      delay: 300,
    },
  });

  return (
    <animated.div className="grid grid-cols-1 lg:grid-cols-9 lg:grid-rows-9 w-screen lg:h-screen p-5 gap-5 bg-gray-900">
      {/* Header with integrated back button */}
      <animated.div
        style={animatedStyles}
        className="row-start-1 lg:row-span-2 lg:col-span-9"
      >
        <animated.div
          style={trails[0]}
          className="w-full h-full bg-[#264653] border border-[#2a9d8f]/30 flex flex-col justify-center items-center text-center p-4 relative overflow-hidden"
        >
          {/* Background SVG - animated version */}
          <svg
            id="e68ZndEqcxF1"
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
            viewBox="0 0 455 512"
            preserveAspectRatio="xMidYMid slice"
            cached="false"
          >
            <g
              id="e68ZndEqcxF2_ts"
              transform="translate(159.889855,223.200948) scale(0,0)"
            >
              <g transform="translate(-150.210518,-169.627434)">
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.833089 119.945149)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.833089 145.43027)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.419299 119.945149)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.805379 119.945149)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.42487 146.23014)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.805379 146.23014)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.81095 173.315001)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.42487 172.515131)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.201859 172.515131)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.587939 172.515131)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.582368 146.23014)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.582368 200.109588)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.20743 200.109588)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.81095 200.109588)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.430441 200.109588)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.83866 199.309718)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.201859 147.03001)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.20743 120.309199)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.218317 119.945149)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.83866 172.515131)"
                  fill="#207a70"
                  stroke="none"
                />
              </g>
            </g>
            <g
              id="e68ZndEqcxF23_ts"
              transform="translate(310.593054,223.200948) scale(0,0)"
            >
              <g transform="translate(-150.210518,-169.627434)">
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.833089 119.145279)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.833089 145.43027)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.42487 120.791443)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.805379 119.945149)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.42487 146.23014)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.805379 146.23014)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.81095 173.361425)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.430441 172.515131)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.20743 172.515131)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(195.031233 172.515131)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.582368 146.23014)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.587939 200.109588)"
                  fill="#64e1d1"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.20743 200.109588)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(139.81095 200.955882)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(112.430441 200.109588)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.83866 199.309718)"
                  fill="#3ac6b5"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.201859 147.076434)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(167.20743 121.155493)"
                  fill="#207a70"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(194.223888 119.945149)"
                  fill="#2a9d8f"
                  stroke="none"
                />
                <rect
                  width="20"
                  height="20"
                  rx="0"
                  ry="0"
                  transform="translate(85.83866 172.561555)"
                  fill="#207a70"
                  stroke="none"
                />
              </g>
            </g>
          </svg>
          {/* Back Button - positioned absolute in top-left */}
          <button
            onClick={() => setCurrentGrid(GRIDS[0])}
            className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-[#E9C46A] to-[#f4a261] hover:from-[#f4a261] hover:to-[#E9C46A] rounded-full border border-[#E9C46A]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#E9C46A]/30 group z-10"
          >
            <svg
              className="w-5 h-5 text-[#264653] group-hover:text-[#2a3a3d] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h1 className="text-4xl lg:text-6xl font-bold text-[#E9C46A] mb-2 relative z-10">
            {name.slice(0, nameIdx).join("")}
            <span className="inline-block mx-2 w-6 h-1 bg-[#E9C46A] animate-pulse"></span>
          </h1>
          <p className="text-lg lg:text-xl text-[#E9C46A]/80 font-medium relative z-10">
            {subheading.slice(0, subheadingIdx).join("")}
          </p>
        </animated.div>
      </animated.div>

      {/* Main Timeline Content - now spans full width */}
      <animated.div
        style={animatedStyles}
        className="row-start-3 lg:row-span-7 lg:col-span-9"
      >
        <animated.div
          style={trails[1]}
          className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 border border-gray-700 overflow-y-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center text-[#E9C46A] text-xl p-8 h-full flex flex-col justify-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <p className="text-[#E9C46A] text-xl font-bold">
                Failed to load work experience
              </p>
            </div>
          ) : workExperience && workExperience.length > 0 ? (
            <div className="h-full">
              <WorkExperienceTimeline workExperience={workExperience} />
            </div>
          ) : (
            <div className="text-center text-[#E9C46A]/80 text-xl p-8 h-full flex flex-col justify-center">
              <div className="mb-4 text-6xl">💼</div>
              <p className="text-[#E9C46A] text-2xl font-bold mb-4">
                No work experience available
              </p>
              <p className="text-[#E9C46A]/70 text-lg">
                Check back later for updates!
              </p>
            </div>
          )}
        </animated.div>
      </animated.div>
    </animated.div>
  );
}
