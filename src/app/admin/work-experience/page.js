"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getAllWorkExperience,
  deleteWorkExperience,
} from "../../../lib/adminOperations";
import { LoadingSpinner } from "../../components/Loading";

export default function WorkExperienceManagement() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (user && isAdmin) {
      fetchWorkExperience();
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchWorkExperience = async () => {
    try {
      setLoading(true);
      const workData = await getAllWorkExperience();
      setWorkExperience(workData);
    } catch (error) {
      setError("Error fetching work experience: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWork = async (workId, position, company) => {
    if (
      confirm(
        `Are you sure you want to delete "${position} at ${company}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteWorkExperience(workId);
        setWorkExperience(workExperience.filter((w) => w.id !== workId));
      } catch (error) {
        setError("Error deleting work experience: " + error.message);
      }
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
                className="text-blue-400 hover:text-blue-300"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Work Experience Management</h1>
            </div>
            <Link href="/admin/work-experience/new">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
                + Add New Experience
              </button>
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

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">
              All Work Experience ({workExperience.length})
            </h2>
          </div>

          {workExperience.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">
                No Work Experience Yet
              </h3>
              <p className="text-gray-400 mb-4">
                Start by adding your work history
              </p>
              <Link href="/admin/work-experience/new">
                <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
                  Add Your First Experience
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {workExperience.map((work) => (
                <div key={work.id} className="bg-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">
                        {work.position}
                      </h3>
                      <h4 className="text-lg text-green-400 mb-2">
                        {work.company}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        {work.startDate} - {work.endDate || "Present"}
                      </p>
                      {work.description && (
                        <p className="text-gray-300 mb-4">{work.description}</p>
                      )}
                      {work.skills && work.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {work.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-purple-600 text-white px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <span className="text-xs text-gray-400">
                        Order: {work.order || "N/A"}
                      </span>
                      <div className="flex space-x-2">
                        <Link href={`/admin/work-experience/edit?id=${work.id}`}>
                          <button className="text-blue-400 hover:text-blue-300 text-sm px-3 py-1 bg-blue-600/20 rounded">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteWork(
                              work.id,
                              work.position,
                              work.company
                            )
                          }
                          className="text-red-400 hover:text-red-300 text-sm px-3 py-1 bg-red-600/20 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
