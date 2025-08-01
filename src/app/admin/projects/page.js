"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllProjects, deleteProject } from "../../../lib/adminOperations";
import { LoadingSpinner } from "../../components/Loading";

export default function ProjectsManagement() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (user && isAdmin) {
      fetchProjects();
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error fetching projects: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId, projectTitle) => {
    if (
      confirm(
        `Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter((p) => p.id !== projectId));
      } catch (error) {
        setError("Error deleting project: " + error.message);
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
              <h1 className="text-2xl font-bold">Projects Management</h1>
            </div>
            <Link href="/admin/projects/new">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                + Add New Project
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
              All Projects ({projects.length})
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-4">
                Start by adding your first project
              </p>
              <Link href="/admin/projects/new">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
                  Add Your First Project
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Technologies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium">
                              {project.title}
                            </div>
                            <div className="text-sm text-gray-400">
                              {project.description?.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies
                            ?.slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies?.length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.featured
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.featured ? "Featured" : "Regular"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {project.order || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link href={`/admin/projects/edit/${project.id}`}>
                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              handleDeleteProject(project.id, project.title)
                            }
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-300 text-sm"
                            >
                              View
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
