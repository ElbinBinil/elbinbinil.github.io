"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "@react-spring/web";
import { useEducation } from "../../hooks/useFirestore";
import { LoadingSpinner } from "../components/Loading";

export default function EducationPage() {
  const [nameIdx, setNameIdx] = useState(0);
  const { education, loading, error } = useEducation();
  const router = useRouter();
  const name = "Education".split("");

  const pageAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  const cardsAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 200, friction: 25 },
    delay: 300,
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (nameIdx < name.length) {
        setNameIdx(nameIdx + 1);
      }
    }, 150);

    return () => clearInterval(id);
  }, [nameIdx, name.length]);

  const handleBack = () => {
    router.push("/");
  };

  const getEducationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "college":
      case "university":
      case "bachelor":
      case "master":
      case "phd":
        return "🎓";
      case "school":
      case "high school":
      case "secondary":
        return "🏫";
      case "course":
      case "certification":
      case "certificate":
        return "📜";
      default:
        return "🎓";
    }
  };

  const getEducationTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "college":
      case "university":
      case "bachelor":
      case "master":
      case "phd":
        return "from-indigo-600 to-purple-700";
      case "school":
      case "high school":
      case "secondary":
        return "from-blue-600 to-indigo-700";
      case "course":
      case "certification":
      case "certificate":
        return "from-emerald-600 to-teal-700";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="text-gray-300 mt-4">Loading education details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Error Loading Education
          </h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <animated.header style={pageAnimation} className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z" />
                </svg>
                Back to Portfolio
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold">
                {name.slice(0, nameIdx).join("")}
                <span className="inline-block w-6 h-1 mx-2 bg-indigo-400 animate-pulse"></span>
              </h1>
            </div>
            <div className="w-32"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </animated.header>

      {/* Main Content */}
      <animated.main
        style={cardsAnimation}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">🎓</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            My Educational Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The knowledge and experiences that shaped my professional
            development
          </p>
        </div>

        {education && education.length > 0 ? (
          <div className="space-y-8">
            {education.map((item, index) => (
              <div
                key={item.id || index}
                className={`relative bg-gradient-to-br ${getEducationTypeColor(
                  item.type
                )} p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-6 top-8 w-12 h-12 bg-gray-900 border-4 border-gray-700 rounded-full flex items-center justify-center text-2xl">
                  {getEducationIcon(item.type)}
                </div>

                <div className="ml-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {item.degree || item.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-200 mb-1">
                        {item.institution || item.school}
                      </h4>
                      {item.field && (
                        <p className="text-gray-300">Field: {item.field}</p>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-200">
                          {item.startDate} - {item.endDate || "Present"}
                        </p>
                        {item.location && (
                          <p className="text-sm text-gray-300">
                            📍 {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.description && (
                    <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm mb-4">
                      <p className="text-gray-200 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {item.grade && (
                    <div className="inline-flex items-center bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                      🏆 Grade: {item.grade}
                    </div>
                  )}

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start text-sm text-gray-300"
                          >
                            <span className="text-yellow-400 mr-2">⭐</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.courses && item.courses.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">
                        Relevant Courses:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {item.courses.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="bg-white/10 text-gray-200 px-2 py-1 rounded-md text-xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No Education Data</h3>
            <p className="text-gray-400">
              Education information will be displayed here once it&apos;s added
              to the database.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">
              Interested in Learning More?
            </h3>
            <p className="text-gray-400 mb-6">
              Let&apos;s connect and discuss how my educational background can
              contribute to your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  (window.location.href = "mailto:elbinbinil@gmail.com")
                }
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Get in Touch
              </button>
              <button
                onClick={handleBack}
                className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </animated.main>
    </div>
  );
}
