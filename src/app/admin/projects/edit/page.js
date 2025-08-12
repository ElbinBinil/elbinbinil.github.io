"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { db } from "../../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
    imageUrl: "",
    featured: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject(docSnap.data());
      } else {
        console.log("No such document!");
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(",").map((tech) => tech.trim());
    setProject((prev) => ({
      ...prev,
      technologies,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, project);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Error</h1>
          <p>No project ID provided.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={project.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={project.technologies.join(", ")}
              onChange={handleTechnologiesChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              GitHub Link
            </label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              value={project.githubLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="liveLink"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Live Link
            </label>
            <input
              type="url"
              id="liveLink"
              name="liveLink"
              value={project.liveLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={project.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={project.featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-300">
                Featured Project
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Project"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditProject() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Loading...</h1>
          </div>
        </div>
      }
    >
      <EditProjectContent />
    </Suspense>
  );
}
