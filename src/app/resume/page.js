"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { useProfile } from "../../hooks/useFirestore";
import { processResumeUrl } from "../../utils/resumeUtils";

export default function ResumePage() {
  const [nameIdx, setNameIdx] = useState(0);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [fallbackMessage, setFallbackMessage] = useState("");
  const { profile, loading: profileLoading } = useProfile();
  const router = useRouter();
  const name = "Resume".split("");

  const viewerAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(50px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    // Check if user has access (came from the form)
    const resumeAccess = sessionStorage.getItem("resumeAccess");
    if (resumeAccess) {
      const accessData = JSON.parse(resumeAccess);
      const now = Date.now();
      const accessTime = accessData.timestamp;

      // Allow access for 1 hour after form submission
      if (now - accessTime < 3600000) {
        setHasAccess(true);
        // Use enhanced resume data from session storage
        if (accessData.resumeUrl) {
          setResumeUrl(accessData.resumeUrl);
          setIsValidUrl(accessData.isValidUrl || true);
          setFallbackMessage(accessData.fallbackMessage || "");
        }
      } else {
        // Access expired, clear storage and redirect
        sessionStorage.removeItem("resumeAccess");
        router.push("/");
      }
    } else {
      // No access, redirect to home
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  // Fallback to profile resume URL if not in session storage
  useEffect(() => {
    if (hasAccess && !resumeUrl && profile?.resumeUrl && !profileLoading) {
      const resumeData = processResumeUrl(profile.resumeUrl);
      setResumeUrl(resumeData.url);
      setIsValidUrl(resumeData.isValid);
      setFallbackMessage(resumeData.message);
    }
  }, [hasAccess, resumeUrl, profile, profileLoading]);

  useEffect(() => {
    const id = setInterval(() => {
      if (nameIdx < name.length) {
        setNameIdx(nameIdx + 1);
      }
    }, 100);

    return () => clearInterval(id);
  }, [nameIdx, name.length]);

  const handleBack = () => {
    router.push("/");
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2a9d8f]/30 border-t-[#E9C46A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-300 mb-4">
            Please fill out the form first to view the resume.
          </p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] text-gray-900 px-6 py-3 rounded-lg font-medium hover:from-[#F4A261] hover:to-[#E76F51] transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Back to Portfolio
          </button>

          <div className="flex items-center space-x-4">
            <div className="bg-[#264653] border border-gray-700 px-4 py-2 rounded-lg shadow-lg">
              <h1 className="text-xl sm:text-2xl font-bold text-[#E9C46A]">
                {name.slice(0, nameIdx).join("")}
                <span className="inline-block mx-1 w-3 h-1 bg-cyan-400 animate-pulse"></span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://drive.google.com/uc?export=download&id=YOUR_PDF_FILE_ID"
              download
              className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] text-gray-900 px-4 py-2 rounded-lg font-medium hover:from-[#F4A261] hover:to-[#E76F51] transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <animated.div style={viewerAnimation} className="flex-1 p-4">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-full border border-gray-700">
            {resumeUrl && isValidUrl ? (
              <iframe
                src={resumeUrl}
                className="w-full h-full"
                title="Resume PDF"
                style={{ minHeight: "80vh" }}
                allow="autoplay"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center p-8 max-w-md">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Resume Not Available
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {fallbackMessage ||
                      "The resume URL is not configured. Please contact the administrator."}
                  </p>
                  <div className="mt-6">
                    <a
                      href="mailto:elbinbinil@gmail.com"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      Contact for Resume
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </animated.div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            💼 Interested in working together? Let's connect!
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="mailto:elbinbinil@gmail.com"
              className="text-[#E9C46A] hover:text-[#F4A261] transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/elbinbinil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E9C46A] hover:text-[#F4A261] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/elbinbinil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E9C46A] hover:text-[#F4A261] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
