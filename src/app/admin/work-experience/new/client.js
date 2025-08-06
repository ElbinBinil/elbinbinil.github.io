"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  addWorkExperience,
  updateWorkExperience,
  getAllWorkExperience,
} from "../../../../lib/adminOperations";
import { LoadingSpinner } from "../../../components/Loading";

export default function WorkExperienceFormClient() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useParams();
  const isEditing = !!params?.id;

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: "",
    order: 1,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (isEditing && params.id) {
      fetchWorkData(params.id);
    }
  }, [user, isAdmin, authLoading, router, isEditing, params.id]);

  const fetchWorkData = async (workId) => {
    try {
      const workExperience = await getAllWorkExperience();
      const work = workExperience.find((w) => w.id === workId);
      if (work) {
        setFormData({
          company: work.company || "",
          position: work.position || "",
          startDate: work.startDate || "",
          endDate: work.endDate || "",
          description: work.description || "",
          skills: work.skills?.join(", ") || "",
          order: work.order || 1,
        });
      }
    } catch (error) {
      setError("Error fetching work experience data: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const workData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
        order: parseInt(formData.order) || 1,
        endDate: formData.endDate || null,
      };

      if (isEditing) {
        await updateWorkExperience(params.id, workData);
        setSuccess("Work experience updated successfully!");
      } else {
        await addWorkExperience(workData);
        setSuccess("Work experience added successfully!");
        setFormData({
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          skills: "",
          order: 1,
        });
      }

      setTimeout(() => {
        router.push("/admin/work-experience");
      }, 2000);
    } catch (error) {
      setError("Error saving work experience: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
                href="/admin/work-experience"
                className="text-blue-400 hover:text-blue-300"
              >
                ← Back to Work Experience
              </Link>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Edit Work Experience" : "Add New Work Experience"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-2"
                >
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                />
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-2"
                >
                  Position *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Software Developer, Frontend Engineer"
                />
              </div>
            </div>

            {/* Start and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-2"
                >
                  Start Date *
                </label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2023-06, June 2023"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-2"
                >
                  End Date
                </label>
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2024-01, Present (leave empty for current)"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Leave empty if this is your current position
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe your role, responsibilities, and achievements..."
              />
            </div>

            {/* Skills */}
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium mb-2"
              >
                Skills (comma-separated)
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="JavaScript, React, Node.js, Python, MongoDB"
              />
              <p className="text-sm text-gray-400 mt-1">
                Separate skills with commas
              </p>
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="block text-sm font-medium mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-400 mt-1">
                Lower numbers appear first (most recent should be 1)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/work-experience">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-lg transition-colors flex items-center space-x-2"
              >
                {loading && <LoadingSpinner size="small" />}
                <span>
                  {isEditing ? "Update Experience" : "Add Experience"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
