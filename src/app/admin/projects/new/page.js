"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  addProject,
  updateProject,
  getAllProjects,
} from "../../../../lib/adminOperations";
import { LoadingSpinner } from "../../../components/Loading";

export default function ProjectForm() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useParams();
  const isEditing = !!params?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    technologies: "",
    featured: false,
    order: 1,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (isEditing && params.id) {
      fetchProjectData(params.id);
    }
  }, [user, isAdmin, authLoading, router, isEditing, params.id]);

  const fetchProjectData = async (projectId) => {
    try {
      const projects = await getAllProjects();
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        setFormData({
          title: project.title || "",
          description: project.description || "",
          imageUrl: project.imageUrl || "",
          githubUrl: project.githubUrl || "",
          liveUrl: project.liveUrl || "",
          technologies: project.technologies?.join(", ") || "",
          featured: project.featured || false,
          order: project.order || 1,
        });
      }
    } catch (error) {
      setError("Error fetching project data: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech),
        order: parseInt(formData.order) || 1,
      };

      if (isEditing) {
        await updateProject(params.id, projectData);
        setSuccess("Project updated successfully!");
      } else {
        await addProject(projectData);
        setSuccess("Project added successfully!");
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          githubUrl: "",
          liveUrl: "",
          technologies: "",
          featured: false,
          order: 1,
        });
      }

      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      setError("Error saving project: " + error.message);
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
                href="/admin/projects"
                className="text-blue-400 hover:text-blue-300"
              >
                ← Back to Projects
              </Link>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Edit Project" : "Add New Project"}
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
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Awesome Todo App"
              />
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
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your project..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium mb-2"
              >
                Image URL *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/project-image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-sm font-medium mb-2"
                >
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label
                  htmlFor="liveUrl"
                  className="block text-sm font-medium mb-2"
                >
                  Live Demo URL
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://myproject.vercel.app"
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label
                htmlFor="technologies"
                className="block text-sm font-medium mb-2"
              >
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB, Express"
              />
              <p className="text-sm text-gray-400 mt-1">
                Separate technologies with commas
              </p>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium mb-2"
                >
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Lower numbers appear first
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm">
                  Featured Project
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/projects">
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors flex items-center space-x-2"
              >
                {loading && <LoadingSpinner size="small" />}
                <span>{isEditing ? "Update Project" : "Add Project"}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
