import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { createPortal } from "react-dom";
import { useResumeAnalytics } from "../../hooks/useResumeAnalytics";
import { useProfile } from "../../hooks/useFirestore";
import { processResumeUrl } from "../../utils/resumeUtils";
import "./resume.css";

// LoadingSpinner component
const LoadingSpinner = ({ size = "medium" }) => {
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

// Email Collection Modal Component
const ResumeModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [errors, setErrors] = useState({});

  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.8)",
    config: { tension: 300, friction: 30 },
  });

  const backdropAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 200, friction: 25 },
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!source) {
      newErrors.source = "Please select how you found me";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(email, source);
    }
  };

  const sourceOptions = [
    { value: "", label: "How did you find me?" },
    { value: "linkedin", label: "💼 LinkedIn" },
    { value: "github", label: "👨‍💻 GitHub" },
    { value: "website", label: "🌐 Website/Portfolio" },
    { value: "youtube", label: "📺 YouTube" },
    { value: "reddit", label: "🤖 Reddit" },
    { value: "friends", label: "👥 Friends/Referral" },
    { value: "colleague", label: "🏢 Colleague/Work" },
    { value: "other", label: "🔗 Other" },
  ];

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop - Fixed to viewport */}
      <animated.div
        style={backdropAnimation}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <animated.div
          style={modalAnimation}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl max-w-md w-full shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-700">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-200"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#E9C46A] to-[#F4A261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                View My Resume
              </h2>
              <p className="text-gray-300 text-sm">
                I'd love to know more about you before sharing my resume
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:ring-2 focus:ring-[#E9C46A] focus:border-transparent transition-all duration-200`}
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Source Dropdown */}
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  How did you find me?
                </label>
                <select
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.source ? "border-red-500" : "border-gray-600"
                  } text-white focus:ring-2 focus:ring-[#E9C46A] focus:border-transparent transition-all duration-200`}
                  disabled={loading}
                >
                  {sourceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.source && (
                  <p className="mt-1 text-sm text-red-400">{errors.source}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E9C46A] to-[#F4A261] text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-[#F4A261] hover:to-[#E76F51] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    View Resume
                  </>
                )}
              </button>
            </form>

            {/* Privacy Note */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <p className="text-xs text-gray-400 text-center">
                🔒 Your information is secure and will only be used for
                analytics purposes.
              </p>
            </div>
          </div>
        </animated.div>
      </animated.div>
    </>
  );

  // Render modal as portal to document body for proper centering
  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default function Resume({ onResumeClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { saveResumeView, loading, error } = useResumeAnalytics();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  const handleResumeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (email, source) => {
    try {
      const userAgent =
        typeof window !== "undefined" ? window.navigator.userAgent : "";
      await saveResumeView(email, source, userAgent);

      // Process the resume URL for proper formatting
      const resumeData = processResumeUrl(profile?.resumeUrl);

      // Close modal and navigate to resume page
      setIsModalOpen(false);

      // Store the data in sessionStorage for the resume page
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "resumeAccess",
          JSON.stringify({
            email,
            source,
            timestamp: Date.now(),
            resumeUrl: resumeData.url, // Use processed resume URL
            isValidUrl: resumeData.isValid,
            fallbackMessage: resumeData.message,
          })
        );

        // Navigate to resume page
        window.location.href = "/resume";
      }
    } catch (err) {
      console.error("Failed to save resume view:", err);
      // Still allow access even if analytics fails
      setIsModalOpen(false);
      if (typeof window !== "undefined") {
        const resumeData = processResumeUrl(profile?.resumeUrl);
        // Store resume URL even if analytics fails
        sessionStorage.setItem(
          "resumeAccess",
          JSON.stringify({
            email: "unknown",
            source: "direct",
            timestamp: Date.now(),
            resumeUrl: resumeData.url,
            isValidUrl: resumeData.isValid,
            fallbackMessage: resumeData.message,
          })
        );
        window.location.href = "/resume";
      }
    }
  };

  return (
    <>
      <div
        className="w-full h-full relative cursor-pointer hover:scale-105 transition-all overflow-hidden"
        onClick={handleResumeClick}
      >
        {/* SVG Background */}
        <svg
          className="w-full h-full absolute inset-0 object-contain"
          id="eGNsHDgmMvZ1"
          viewBox="0 0 303 256"
          preserveAspectRatio="xMidYMid meet"
          cached="false"
        >
          <rect
            width="150"
            height="200"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 59.069019 42.649988)"
            fill="#9ad1ea"
            stroke="#000"
          />
          <rect
            width="130"
            height="180"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 70.653578 50.742368)"
            fill="#fff"
            stroke="#000"
          />
          <g transform="translate(.000001 0)">
            <path
              id="eGNsHDgmMvZ5"
              d="M12.79,40c9.997312,0,9.997312,10,19.994625,10s9.997313-10,19.994625-10s10.01075,10,19.994625,10s9.997313-10,20.008063-10s9.997312,10,20.008062,10"
              transform="matrix(.970496-.241117 0.241117 0.970496 79.712293 86.321365)"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeDashoffset="115"
              strokeDasharray="115.56"
            />
            <path
              id="eGNsHDgmMvZ6"
              d="M12.79,40c9.997312,0,9.997312,10,19.994625,10s9.997313-10,19.994625-10s10.01075,10,19.994625,10s9.997313-10,20.008063-10s9.997312,10,20.008062,10"
              transform="matrix(.970496-.241117 0.241117 0.970496 82.123461 96.026326)"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeDashoffset="115"
              strokeDasharray="115.56"
            />
            <path
              id="eGNsHDgmMvZ7"
              d="M12.79,40c9.997312,0,9.997312,10,19.994625,10s9.997313-10,19.994625-10s10.01075,10,19.994625,10s9.997313-10,20.008063-10s9.997312,10,20.008062,10"
              transform="matrix(.970496-.241117 0.241117 0.970496 83.329045 105.731287)"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeDashoffset="115"
              strokeDasharray="115.56"
            />
            <path
              id="eGNsHDgmMvZ8"
              d="M12.79,40c9.997312,0,9.997312,10,19.994625,10s9.997313-10,19.994625-10s10.01075,10,19.994625,10s9.997313-10,20.008063-10s9.997312,10,20.008062,10"
              transform="matrix(.970496-.241117 0.241117 0.970496 84.534629 115.285528)"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeDashoffset="115"
              strokeDasharray="115.56"
            />
            <path
              id="eGNsHDgmMvZ9"
              d="M12.79,40c9.997312,0,9.997312,10,19.994625,10s9.997313-10,19.994625-10s10.01075,10,19.994625,10s9.997313-10,20.008063-10s9.997312,10,20.008062,10"
              transform="matrix(.970496-.241117 0.241117 0.970496 86.292746 124.990489)"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeDashoffset="115"
              strokeDasharray="115.56"
            />
          </g>
          <g
            id="eGNsHDgmMvZ10_ts"
            transform="translate(114.521299,91.655488) rotate(-15.268073) scale(0,0)"
          >
            <g transform="translate(-50,-50.000002)">
              <circle
                r="20"
                transform="translate(49.249341 53.412947)"
                fill="#e9c46a"
                stroke="#000"
              />
              <rect
                width="10"
                height="10"
                rx="14.61"
                ry="14.61"
                transform="matrix(1 0 0 1.012426 43.095912 40.207142)"
                fill="#fff"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M47.75,68.09v-1.011122c-.017271-5.515059-4.484322-9.981608-10-9.998878v0c-5.515678.01727-9.982729,4.483819-10,9.998878v1.011122Z"
                transform="translate(11.638304-4.176131)"
                fill="#e76f51"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
          <path
            id="eGNsHDgmMvZ14"
            d="M46.849999,16.82L36.690447,18.684246L28.077349,17.052517L26.85,16.82L46.85,16.82L46.849999,16.82Z"
            transform="matrix(.984808-.173648 0.173648 0.984808 140.143352 21.197326)"
            fill="#e76f51"
            stroke="#000"
          />
          <rect
            id="eGNsHDgmMvZ15"
            width="0"
            height="10"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 137.520203 77.463428)"
            fill="#2a9d8f"
            stroke="#000"
          />
          <rect
            id="eGNsHDgmMvZ16"
            width="0"
            height="10"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 140.405443 92.950047)"
            fill="#2a9d8f"
            stroke="#000"
          />
          <rect
            id="eGNsHDgmMvZ17"
            width="40"
            height="0"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 106.800322 177.802951)"
            fill="#f4a261"
            stroke="#000"
          />
          <rect
            id="eGNsHDgmMvZ18"
            width="60"
            height="0"
            rx="0"
            ry="0"
            transform="matrix(.984808-.173648 0.173648 0.984808 155.116753 168.79446)"
            fill="#264653"
            stroke="#000"
          />
        </svg>

        {/* Resume Text Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#264653] w-fit px-5 py-2 border border-black z-10">
          <h2 className="font-neutral-900 text-3xl font-bold text-[#E9C46A]">
            Resume
          </h2>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </>
  );
}
