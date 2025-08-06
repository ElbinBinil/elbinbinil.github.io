"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllEducation, deleteEducation } from "../../../lib/adminOperations";
import { LoadingSpinner } from "../../components/Loading";

export default function EducationManagement() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (user && isAdmin) {
      fetchEducation();
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const educationData = await getAllEducation();
      setEducation(educationData);
    } catch (error) {
      setError("Error fetching education: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEducation = async (educationId, degree, institution) => {
    if (
      confirm(
        `Are you sure you want to delete "${degree} at ${institution}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteEducation(educationId);
        setEducation(education.filter((e) => e.id !== educationId));
      } catch (error) {
        setError("Error deleting education: " + error.message);
      }
    }
  };

  const getEducationTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "college":
      case "university":
      case "bachelor":
      case "master":
      case "phd":
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
      case "school":
      case "high school":
      case "secondary":
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case "course":
      case "certification":
      case "certificate":
        return "bg-gradient-to-r from-emerald-500 to-teal-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Education Management</h1>
            </div>
            <Link
              href="/admin/education/new"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              + Add Education
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {education.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-4">No Education Records</h3>
            <p className="text-gray-400 mb-6">
              Start building your education history by adding your first record.
            </p>
            <Link
              href="/admin/education/new"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Add Your First Education Record
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Education Records ({education.length})
              </h2>
            </div>

            <div className="grid gap-6">
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className={`${getEducationTypeColor(
                    item.type
                  )} p-6 rounded-xl shadow-lg border border-gray-700`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">
                          {getEducationIcon(item.type)}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {item.degree || item.title}
                          </h3>
                          <p className="text-gray-200 font-medium">
                            {item.institution || item.school}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="bg-black/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-300 uppercase tracking-wide">
                            Period
                          </p>
                          <p className="text-sm font-medium text-white">
                            {item.startDate} - {item.endDate || "Present"}
                          </p>
                        </div>

                        {item.field && (
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-gray-300 uppercase tracking-wide">
                              Field
                            </p>
                            <p className="text-sm font-medium text-white">
                              {item.field}
                            </p>
                          </div>
                        )}

                        {item.location && (
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-gray-300 uppercase tracking-wide">
                              Location
                            </p>
                            <p className="text-sm font-medium text-white">
                              {item.location}
                            </p>
                          </div>
                        )}

                        {item.grade && (
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-gray-300 uppercase tracking-wide">
                              Grade
                            </p>
                            <p className="text-sm font-medium text-yellow-200">
                              {item.grade}
                            </p>
                          </div>
                        )}
                      </div>

                      {item.description && (
                        <div className="bg-black/20 p-3 rounded-lg mb-4">
                          <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                            Description
                          </p>
                          <p className="text-sm text-gray-200">
                            {item.description}
                          </p>
                        </div>
                      )}

                      {item.achievements && item.achievements.length > 0 && (
                        <div className="bg-black/20 p-3 rounded-lg mb-4">
                          <p className="text-xs text-gray-300 uppercase tracking-wide mb-2">
                            Achievements
                          </p>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="text-sm text-gray-200 flex items-start"
                              >
                                <span className="text-yellow-400 mr-2">⭐</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.courses && item.courses.length > 0 && (
                        <div className="bg-black/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-300 uppercase tracking-wide mb-2">
                            Relevant Courses
                          </p>
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

                    <div className="flex flex-col space-y-2 ml-4">
                      <span className="bg-black/30 text-white px-2 py-1 rounded text-xs">
                        Order: {item.order || index + 1}
                      </span>
                      <Link
                        href={`/admin/education/edit?id=${item.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteEducation(
                            item.id,
                            item.degree || item.title,
                            item.institution || item.school
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
