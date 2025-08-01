import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

// Custom LeetCode Icon Component
function LeetCodeIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      width="24"
      height="24"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.884 2.133 8.096-.072l2.045-2.042a1.374 1.374 0 0 0-.001-1.946 1.378 1.378 0 0 0-1.946.001l-2.045 2.042a2.813 2.813 0 0 1-3.954.033L9.28 16.284a2.934 2.934 0 0 1-.474-.62 2.78 2.78 0 0 1-.155-.435 2.798 2.798 0 0 1-.031-1.191 2.557 2.557 0 0 1 .055-.25 2.839 2.839 0 0 1 .56-.892L12.27 8.84l4.605-4.633a1.378 1.378 0 0 0 0-1.946A1.374 1.374 0 0 0 15.928.823L13.483 0zm6.823 11.204a1.374 1.374 0 0 0-.961.438l-2.045 2.042a1.374 1.374 0 0 0 0 1.946 1.378 1.378 0 0 0 1.946 0l2.045-2.042a1.374 1.374 0 0 0 0-1.946 1.374 1.374 0 0 0-.985-.438z" />
    </svg>
  );
}

function BlackIconWrapper({ icon, href, isCustomIcon = false }) {
  return (
    <IconWrapper
      icon={icon}
      bgColor="bg-gray-800"
      textColor="text-cyan-400"
      href={href}
      isCustomIcon={isCustomIcon}
    />
  );
}

function RedIconWrapper({ icon, href }) {
  return (
    <IconWrapper
      icon={icon}
      bgColor="bg-gray-700"
      textColor="text-orange-400"
      href={href}
    />
  );
}

function IconWrapper({ icon, bgColor, textColor, href, isCustomIcon = false }) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-20 h-20 md:w-14 md:h-14 lg:w-20 lg:h-20 ${bgColor} flex items-center justify-center text-3xl transition-all hover:text-4xl cursor-pointer border border-gray-600 hover:scale-105 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25`}
    >
      {isCustomIcon ? (
        <div className={`${textColor} w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8`}>
          {icon}
        </div>
      ) : (
        <FontAwesomeIcon icon={icon} className={textColor} />
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <div className="md:w-1/2">
        <svg id="ecfYqkDzjoQ1" viewBox="0 0 300 300" cached="true">
          <rect
            width="180"
            height="100"
            rx="0"
            ry="0"
            transform="translate(60.17149 108.449952)"
            fill="#e9c46a"
            stroke-width="2"
          />
          <path
            id="ecfYqkDzjoQ3"
            d="M60.17149,102.131785h180l-56.262776,38.259286h-66.503538L60.17149,102.131785Z"
            transform="matrix(1.014566 0 0 1-2.187398 6.318167)"
            fill="#fada8e"
            stroke="#000"
          />
          <g id="ecfYqkDzjoQ4_to" transform="translate(112.311339,143.37819)">
            <rect
              id="ecfYqkDzjoQ4"
              width="130"
              height="70"
              rx="0"
              ry="0"
              transform="translate(-23,-23)"
              opacity="0"
              fill="#fff"
              stroke="#000"
            />
          </g>
          <path
            d="M57.541567,231.197731l58.128647-61.740714l67.615265.555863l55.567062,61.184851h-181.310974Z"
            transform="translate(1.318949-22.747779)"
            fill="#e9c46a"
            stroke="#000"
          />
          <g id="ecfYqkDzjoQ6_to" transform="translate(165.331702,160.997459)">
            <path
              d="M34.184295,24.718736c-13.089115-12.08083-29.609924,9.009516,0,24.589991c29.609923-15.580475,13.089114-36.670821,0-24.589991Z"
              transform="translate(-49.999996,-50.074374)"
              fill="#e76f51"
              stroke="#000"
            />
          </g>
          <path
            d="M117.537054,170.01288L59.065428,231.753594l.342979-100l58.128647,38.259286Z"
            transform="translate(-.547891-23.303642)"
            fill="#fada8e"
            stroke="#000"
          />
          <path
            d="M183.285482,170.012881l56.262776-38.259287v100l-56.262776-61.740713Z"
            transform="translate(.623232-23.303642)"
            fill="#fada8e"
            stroke="#000"
          />
          <g id="ecfYqkDzjoQ9_to" transform="translate(153.264699,121.816195)">
            <text
              id="ecfYqkDzjoQ9"
              dx="0"
              dy="0"
              fontFamily='"ecfYqkDzjoQ1:::Oswald"'
              fontSize="15"
              fontWeight="700"
              transform="translate(-41.068009,5.272683)"
              opacity="0"
              fill="#e76f51"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" stroke-width="0">
                CONTACT ME
              </tspan>
            </text>
          </g>
          <path
            id="ecfYqkDzjoQ11"
            d="M33.5,38.5c-4.361905,3.466667-5.766667,6.27619-7.5,15-1.733333-8.72381-3.138095-11.533333-7.5-15c4.361905-3.466667,5.766667-6.27619,7.5-15c1.733333,8.72381,3.138095,11.533333,7.5,15Z"
            transform="translate(165.408714 26.767436)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
          <path
            id="ecfYqkDzjoQ12"
            d="M33.5,38.5c-4.361905,3.466667-5.766667,6.27619-7.5,15-1.733333-8.72381-3.138095-11.533333-7.5-15c4.361905-3.466667,5.766667-6.27619,7.5-15c1.733333,8.72381,3.138095,11.533333,7.5,15Z"
            transform="translate(79.404114 117.15854)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
          <path
            id="ecfYqkDzjoQ13"
            d="M28.5,31c-2.907937,1.733334-3.844445,3.138095-5,7.5-1.155555-4.361905-2.092063-5.766666-5-7.5c2.907937-1.733333,3.844445-3.138095,5-7.5c1.155555,4.361905,2.092063,5.766667,5,7.5Z"
            transform="translate(180.408714 19.267436)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
          <path
            id="ecfYqkDzjoQ14"
            d="M28.5,31c-2.907937,1.733334-3.844445,3.138095-5,7.5-1.155555-4.361905-2.092063-5.766666-5-7.5c2.907937-1.733333,3.844445-3.138095,5-7.5c1.155555,4.361905,2.092063,5.766667,5,7.5Z"
            transform="translate(185.408714 41.767436)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
          <path
            id="ecfYqkDzjoQ15"
            d="M28.5,31c-2.907937,1.733334-3.844445,3.138095-5,7.5-1.155555-4.361905-2.092063-5.766666-5-7.5c2.907937-1.733333,3.844445-3.138095,5-7.5c1.155555,4.361905,2.092063,5.766667,5,7.5Z"
            transform="translate(155.408714 102.15854)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
          <path
            id="ecfYqkDzjoQ16"
            d="M28.5,31c-2.907937,1.733334-3.844445,3.138095-5,7.5-1.155555-4.361905-2.092063-5.766666-5-7.5c2.907937-1.733333,3.844445-3.138095,5-7.5c1.155555,4.361905,2.092063,5.766667,5,7.5Z"
            transform="translate(74.404114 102.15854)"
            opacity="0"
            fill="#fff"
            stroke="#000"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-3 md:w-1/2">
        <BlackIconWrapper
          icon={faInstagram}
          href="https://instagram.com/elbinbinil"
        />
        <RedIconWrapper
          icon={faXTwitter}
          href="https://twitter.com/elbinbinil"
        />
        <BlackIconWrapper
          icon={<LeetCodeIcon className="text-cyan-400" />}
          href="https://leetcode.com/u/hopper04"
          isCustomIcon={true}
        />
        <RedIconWrapper
          icon={faLinkedinIn}
          href="https://linkedin.com/in/elbinbinil"
        />
        <BlackIconWrapper
          icon={faGithub}
          href="https://github.com/elbinbinil"
        />
        <RedIconWrapper icon={faEnvelope} href="mailto:elbinbinil@gmail.com" />
      </div>
    </>
  );
}
