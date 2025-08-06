"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";
import { addEducation } from "../../../../lib/adminOperations";
import { LoadingSpinner } from "../../../components/Loading";

export default function AddEducation() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: "university",
    degree: "",
    institution: "",
    field: "",
    startDate: "",
    endDate: "",
    location: "",
    grade: "",
    description: "",
    achievements: [""],
    courses: [""],
    order: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, value, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Clean up the data before submitting
      const cleanedData = {
        ...formData,
        achievements: formData.achievements.filter(
          (item) => item.trim() !== ""
        ),
        courses: formData.courses.filter((item) => item.trim() !== ""),
        order: parseInt(formData.order) || 0,
      };

      await addEducation(cleanedData);
      router.push("/admin/education");
    } catch (error) {
      setError("Error adding education: " + error.message);
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
    router.push("/admin/login");
    return null;
  }

  const educationTypes = [
    { value: "university", label: "University/College" },
    { value: "school", label: "High School" },
    { value: "certification", label: "Certification" },
    { value: "course", label: "Course" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/education"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Education
              </Link>
              <h1 className="text-2xl font-bold">Add New Education</h1>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Education Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {educationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Display order (0 = first)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Degree/Title *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Bachelor of Science, High School Diploma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., University of Example, Example High School"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., New York, NY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Sep 2020, 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., May 2024, Present"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grade/GPA
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 3.8 GPA, First Class, A+"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your education experience, what you learned, etc."
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, "achievements")
                  }
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Dean's List, Magna Cum Laude"
                />
                {formData.achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "achievements")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("achievements")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Add Achievement
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Relevant Courses</h2>
            {formData.courses.map((course, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={course}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, "courses")
                  }
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Data Structures, Advanced Mathematics"
                />
                {formData.courses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "courses")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("courses")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Add Course
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/education"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading && <LoadingSpinner size="small" />}
              {loading ? "Adding..." : "Add Education"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
