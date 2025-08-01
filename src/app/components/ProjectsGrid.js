import { useEffect, useState } from "react";
import { useTrail, animated, easings } from "@react-spring/web";
import { GRIDS } from "../constants";
import { useProjects } from "../../hooks/useFirestore";
import "./projects.css";

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

// Individual Project Card Component
const ProjectCard = ({
  project,
  style,
  bgGradient = "bg-gradient-to-br from-purple-600 to-purple-800",
}) => {
  return (
    <animated.div
      style={style}
      className={`w-full h-full relative ${bgGradient} border border-gray-700 group cursor-pointer overflow-hidden hover:scale-[1.02] hover:border-purple-400 transition-all duration-300`}
    >
      {project ? (
        <>
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2 line-clamp-2">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                  {project.description}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-300 font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured badge for featured projects */}
          {project.featured && (
            <div className="absolute top-3 right-3 bg-[#E9C46A] text-[#264653] px-2 py-1 rounded text-xs font-bold">
              Featured
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default function ProjectsGrid({ setCurrentGrid, animatedStyles }) {
  const { projects, loading, error } = useProjects();
  const [nameIdx, setNameIdx] = useState(0);
  const name = "Projects".split("");

  const [subheadingIdx, setSubheadingIdx] = useState(0);
  const subheading =
    "Here are a few personal projects I've worked on over the years".split("");

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

  const trails = useTrail(7, {
    from: { scale: 0 },
    to: { scale: 1 },
    leave: { scale: 1 },
    config: {
      easing: easings.easeInBack,
      delay: 300,
    },
  });

  // Get projects for each bento box (first 6 projects)
  const displayProjects = projects?.slice(0, 6) || [];
  const projectsWithPlaceholders = [...displayProjects];

  // Fill remaining slots with null for "Coming Soon" placeholders
  while (projectsWithPlaceholders.length < 6) {
    projectsWithPlaceholders.push(null);
  }

  return (
    <animated.div className="grid grid-cols-1 lg:grid-cols-9 lg:grid-rows-9 w-screen lg:h-screen p-5 gap-5 bg-gray-900">
      {/* Project 1 - Large left box */}
      <animated.div
        style={animatedStyles}
        className="row-start-4 lg:row-span-3 lg:col-span-5"
      >
        {loading ? (
          <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700 border border-gray-700 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : error ? (
          <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 border border-gray-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl mb-1">⚠️</div>
              <p className="text-xs">Error loading projects</p>
            </div>
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[0]}
            style={trails[1]}
            bgGradient="bg-gradient-to-br from-emerald-600 to-teal-700"
          />
        )}
      </animated.div>

      {/* Project 2 - Top right box */}
      <animated.div
        style={animatedStyles}
        className="lg:row-span-3 lg:col-span-4"
      >
        {loading ? (
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 border border-gray-700 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[1]}
            style={trails[3]}
            bgGradient="bg-gradient-to-br from-orange-500 to-red-600"
          />
        )}
      </animated.div>

      {/* Project 3 - Tall right box */}
      <animated.div
        style={animatedStyles}
        className="lg:col-span-3 lg:row-span-6"
      >
        {loading ? (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 border border-gray-700 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[2]}
            style={trails[2]}
            bgGradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
          />
        )}
      </animated.div>

      <animated.div
        style={animatedStyles}
        onClick={() => setCurrentGrid(GRIDS[0])}
        className="row-start-1 lg:col-span-3 lg:row-span-3 cursor-pointer hover:scale-105 transition-all"
      >
        <animated.div
          style={trails[0]}
          className="w-full h-full relative bg-gradient-to-br from-cyan-500 to-blue-600 border border-gray-700 hover:border-cyan-400 transition-colors group"
        >
          {/* Complete animated Projects SVG */}
          <svg
            id="ewEtQUf14pr1"
            className="w-full lg:absolute bottom-0 opacity-100"
            viewBox="0 0 455 256"
            cached="false"
          >
            <g transform="translate(57.250088 32.050721)">
              <g clipPath="url(#ewEtQUf14pr6)">
                <g>
                  <path
                    d="M418.89954,133.40093h30.002001v162.097356h-30.002001v-162.097356Zm0,0"
                    transform="matrix(.929756 0 0 0.929756-86.1774-89.6748)"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                </g>
                <clipPath id="ewEtQUf14pr6" />
              </g>
              <rect
                width="322.07"
                height="150.71"
                rx="0"
                ry="0"
                transform="translate(9.215 34.35601)"
                fill="#e9c46a"
                stroke="#000"
              />
              <path
                d="M302,33h27v152.769531h-27L302,33Zm0,0"
                transform="translate(2.164062-1.086783)"
                fill="#f4a261"
                stroke="#000"
              />
              <path
                d="M418.89954,133.40093h20.983935v19.363896h-20.983935v-19.363896Zm0,0"
                transform="matrix(.935001 0 0 0.929565-84.190383-85.930568)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <path
                d="M418.89954,133.40093h20.983935v19.363896h-20.983935v-19.363896Zm0,0"
                transform="matrix(.935001 0 0 0.929565-83.673098 40.143693)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <g clipPath="url(#ewEtQUf14pr14)">
                <g>
                  <path
                    d="M9.214844,6.832031h322.066406v27.523438h-322.066406v-27.523438Zm0,0"
                    fill="#264653"
                    stroke="#000"
                  />
                </g>
                <clipPath id="ewEtQUf14pr14">
                  <path d="M9,6.164062h323L332,35L9,35L9,6.164062Zm0,0" />
                </clipPath>
              </g>
              <g clipPath="url(#ewEtQUf14pr19)">
                <g>
                  <path
                    d="M102.599206,103.798059h346.398967v29.602871h-346.398967v-29.602871Zm0,0"
                    transform="matrix(.929756 0 0 0.929756-86.1774-89.6748)"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                </g>
                <clipPath id="ewEtQUf14pr19">
                  <path d="M8.75,6.164062h323.25L332,35L8.75,35v-28.835938Zm0,0" />
                </clipPath>
              </g>
              <path
                d="M422.701782,107.999431h21.200126v21.200126h-21.200126v-21.200126Zm0,0"
                transform="matrix(.929756 0 0 0.929756-86.1774-89.6748)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <path
                d="M394.598801,107.999431h21.200126v21.200126h-21.200126v-21.200126Zm0,0"
                transform="matrix(.929756 0 0 0.929756-86.1774-89.6748)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <path
                d="M398.601763,111.998316h13.196511v13.200713h-13.196511v-13.200713Zm0,0"
                transform="matrix(0-.929756 0.929756 0 180.306 397.399)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <path
                d="M366.600854,107.999431h21.200126v21.200126h-21.200126v-21.200126Zm0,0"
                transform="matrix(.929756 0 0 0.929756-86.1774-89.6748)"
                fill="#94d1ee"
                stroke="#000"
                strokeMiterlimit="10"
              />
              <path
                d="M322.5625,14.070312l.65625.65625-12.359375,12.359376-.65625-.65625L322.5625,14.070312Zm0,0"
                transform="translate(.000001 0.456772)"
              />
              <path d="M310.164062,14.773438l.65625-.660157l12.359376,12.359375-.65625.660156-12.359376-12.359374Zm0,0" />
              <path
                d="M270.355469,20.191406v.85h-13v-.85h13Zm0,0"
                transform="translate(.671947-.402344)"
                stroke="#000"
              />
              <path
                d="M315.962231,38.074219l-7.458325,12.273437h15l-7.541675-12.273437Zm0,0"
                transform="translate(1.240234 2.86333)"
              />
              <path
                d="M315.962231,180.792969l7.541675-12.273438h-15l7.458325,12.273438Zm0,0"
                transform="translate(1.660156-1.507722)"
              />
              <g
                id="ewEtQUf14pr30_to"
                transform="translate(-85.659565,-89.6748)"
              >
                <path
                  d="M423.39921,164.49949v63.600378h21.099293v-63.600378h-21.099293Zm0,0"
                  transform="scale(0.929756,0.929756) translate(0,0)"
                  fill="#94d1ee"
                  stroke="#000"
                  strokeMiterlimit="10"
                />
              </g>
              <g
                id="ewEtQUf14pr31_tr"
                transform="translate(23.292969,20.369141) rotate(0)"
              >
                <g transform="translate(-23.292969,-20.36914)">
                  <g clipPath="url(#ewEtQUf14pr35)">
                    <g>
                      <path
                        d="M23.292969,28.609375c-.542969,0-1.078125-.054687-1.609375-.160156-.527344-.105469-1.042969-.261719-1.542969-.46875s-.976563-.460938-1.425781-.761719-.867188-.640625-1.246094-1.023438c-.382812-.382812-.726562-.800781-1.027344-1.25s-.554687-.925781-.761718-1.421874c-.207032-.5-.363282-1.015626-.46875-1.546876s-.15625-1.066406-.15625-1.609374c0-.539063.050781-1.074219.15625-1.605469s.261718-1.046875.46875-1.546875.460937-.972656.761718-1.421875c.300782-.453125.644532-.867188,1.027344-1.25.378906-.382813.796875-.722657,1.246094-1.023438s.925781-.554687,1.425781-.761719s1.015625-.363281,1.542969-.46875c.53125-.105468,1.066406-.160156,1.609375-.160156.539062,0,1.078125.054688,1.605469.160156.53125.105469,1.046874.261719,1.546874.46875s.976563.460938,1.425782.761719.863281.640625,1.246094,1.023438.726562.796875,1.027343,1.25c.300781.449219.554688.921875.761719,1.421875s.363281,1.015625.46875,1.546875.15625,1.066406.15625,1.605469c0,.867187-.132812,1.707031-.398438,2.53125-.03125.097656-.089843.167968-.179687.214843s-.183594.058594-.28125.027344c-.09375-.03125-.167969-.089844-.214844-.179687s-.054687-.183594-.027343-.28125c.164062-.503907.273437-1.015626.324218-1.542969.054688-.523438.054688-1.050781-.003906-1.574219-.054688-.527344-.164062-1.039062-.332031-1.542969-.164063-.503906-.378907-.980469-.644531-1.4375s-.574219-.882812-.929688-1.273437-.746094-.742188-1.175781-1.050782c-.425781-.308593-.882813-.570312-1.367188-.785156s-.984375-.375-1.5-.484375c-.519531-.105469-1.039062-.160156-1.570312-.15625-.527344,0-1.050781.058594-1.566407.167969-.515624.113281-1.015624.277344-1.496093.492188-.484375.21875-.9375.480468-1.363281.792968s-.816407.667969-1.167969,1.058594c-.351563.394531-.660157.820312-.921875,1.28125-.261719.457031-.476563.9375-.636719,1.441406s-.269531,1.019532-.320313,1.542969c-.054687.527344-.050781,1.054687.003907,1.578125.058593.523438.167969,1.039062.335937,1.539062.164063.503907.378906.984376.648438,1.4375.265625.457032.574218.882813.929687,1.273438s.75.742188,1.175781,1.050781c.429688.308594.886719.566407,1.371094.78125.484375.210938.984375.371094,1.5.480469.519532.105469,1.042969.160156,1.570313.15625.359375,0,.71875-.027344,1.078125-.078125.097656-.011719.183594.011719.257812.066406.078125.058594.125.136719.140625.230469.011719.09375-.011719.179688-.070312.257812s-.132813.125-.230469.140626c-.390625.054687-.78125.085937-1.175781.085937Zm0,0"
                        fill="#231f20"
                      />
                    </g>
                    <clipPath id="ewEtQUf14pr35">
                      <path
                        d="M15.027344,12.101562h16.460937v16.464844h-16.460937v-16.464844Zm0,0"
                        transform="translate(.000001 0)"
                      />
                    </clipPath>
                  </g>
                </g>
              </g>
              <rect
                id="ewEtQUf14pr64"
                width="60"
                height="0"
                rx="0"
                ry="0"
                transform="translate(76.212771 75.110196)"
                fill="#94d1ee"
                stroke="#000"
              />
              <rect
                id="ewEtQUf14pr65"
                width="0"
                height="10"
                rx="0"
                ry="0"
                transform="translate(142.382948 75.261707)"
                fill="#2a9d8f"
                stroke="#000"
              />
              <rect
                id="ewEtQUf14pr66"
                width="0"
                height="10"
                rx="0"
                ry="0"
                transform="translate(142.382948 100.110196)"
                fill="#2a9d8f"
                stroke="#000"
              />
              <rect
                id="ewEtQUf14pr67"
                width="0"
                height="10"
                rx="0"
                ry="0"
                transform="translate(142.382948 125.082024)"
                fill="#2a9d8f"
                stroke="#000"
              />
              <rect
                id="ewEtQUf14pr68"
                width="270"
                height="0"
                rx="0"
                ry="0"
                transform="translate(77.382948 145.148528)"
                fill="#e76f51"
                stroke="#000"
              />
              <g
                id="ewEtQUf14pr69_to"
                style={{
                  offsetPath:
                    "path('M81.698795,100.07005Q163.994974,54.715908,172.616601,102.905154C181.238228,151.0944,138.913879,155.173859,165.562543,183.229554C192.211207,211.285249,239.238262,188.7693,267.454495,159.202883C295.670728,129.636466,347.793523,145.607908,347.808675,168.337652')",
                  offsetRotate: "0deg",
                }}
              >
                <path
                  d="M37.641889,35.240104l2.795265,6.580615L37.449242,43.09l-2.791488-6.584393-4.449761,6.131079L30.14,21.72l15,14.577838Z"
                  transform="translate(-37.639999,-32.404997)"
                  fill="#fff"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>

          {/* Content Overlay with title in bottom-left corner */}
          <div className="absolute inset-0 z-10">
            <div className="absolute bottom-3 left-0">
              <div className="bg-[#264653] border border-gray-700 w-fit px-5 py-2 m-3 shadow-lg">
                <h3 className="text-3xl font-bold text-[#E9C46A]">
                  {name.slice(0, nameIdx).join("")}
                  <span className="inline-block mx-2 w-6 h-1 bg-cyan-400 animate-pulse"></span>
                </h3>
              </div>
            </div>
          </div>
        </animated.div>
      </animated.div>

      {/* Project 4 - Bottom left box */}
      <animated.div
        style={animatedStyles}
        className="lg:row-span-3 lg:col-span-3"
      >
        {loading ? (
          <div className="w-full h-full bg-[#6A994E] border border-neutral-900 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[3]}
            style={trails[4]}
            bgColor="bg-[#6A994E]"
          />
        )}
      </animated.div>

      {/* Project 5 - Bottom center box */}
      <animated.div
        style={animatedStyles}
        className="lg:row-span-3 lg:col-span-4"
      >
        {loading ? (
          <div className="w-full h-full bg-[#BC4749] border border-neutral-900 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[4]}
            style={trails[5]}
            bgColor="bg-[#BC4749]"
          />
        )}
      </animated.div>

      {/* Project 6 - Bottom right box */}
      <animated.div
        style={animatedStyles}
        className="lg:row-span-3 lg:col-span-2"
      >
        {loading ? (
          <div className="w-full h-full bg-[#A7C957] border border-black flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ProjectCard
            project={projectsWithPlaceholders[5]}
            style={trails[4]}
            bgColor="bg-[#A7C957]"
          />
        )}
      </animated.div>
    </animated.div>
  );
}
