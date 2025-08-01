"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { getProfile } from "../../../lib/firestore";
import { updateProfile } from "../../../lib/adminOperations";
import { LoadingSpinner } from "../../components/Loading";

export default function ProfileManagement() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
    profileImage: "",
    resumeUrl: "",
    yearsExperience: 0,
    projectsHandled: 0,
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
      email: "",
      leetcode: "",
    },
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
      return;
    }

    if (user && isAdmin) {
      fetchProfile();
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfile();
      if (profileData) {
        setFormData({
          name: profileData.name || "",
          location: profileData.location || "",
          bio: profileData.bio || "",
          profileImage: profileData.profileImage || "",
          resumeUrl: profileData.resumeUrl || "",
          yearsExperience: profileData.yearsExperience || 0,
          projectsHandled: profileData.projectsHandled || 0,
          socialLinks: {
            linkedin: profileData.socialLinks?.linkedin || "",
            github: profileData.socialLinks?.github || "",
            twitter: profileData.socialLinks?.twitter || "",
            instagram: profileData.socialLinks?.instagram || "",
            email: profileData.socialLinks?.email || "",
            leetcode: profileData.socialLinks?.leetcode || "",
          },
        });
      }
    } catch (error) {
      setError("Error fetching profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const socialKey = name.replace("socialLinks.", "");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const profileData = {
        ...formData,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        projectsHandled: parseInt(formData.projectsHandled) || 0,
      };

      await updateProfile(profileData);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
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
              <h1 className="text-2xl font-bold">Profile Management</h1>
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
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Bangalore, India"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2">
                Bio / About
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell people about yourself..."
              />
            </div>

            {/* Images and URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium mb-2"
                >
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <div>
                <label
                  htmlFor="resumeUrl"
                  className="block text-sm font-medium mb-2"
                >
                  Resume URL
                </label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="yearsExperience"
                  className="block text-sm font-medium mb-2"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsExperience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="projectsHandled"
                  className="block text-sm font-medium mb-2"
                >
                  Projects Handled
                </label>
                <input
                  type="number"
                  id="projectsHandled"
                  name="projectsHandled"
                  value={formData.projectsHandled}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-medium mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="socialLinks.email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="socialLinks.email"
                    name="socialLinks.email"
                    value={formData.socialLinks.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="socialLinks.linkedin"
                    className="block text-sm font-medium mb-2"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="socialLinks.linkedin"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="socialLinks.github"
                    className="block text-sm font-medium mb-2"
                  >
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="socialLinks.github"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="socialLinks.twitter"
                    className="block text-sm font-medium mb-2"
                  >
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="socialLinks.twitter"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="socialLinks.instagram"
                    className="block text-sm font-medium mb-2"
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="socialLinks.instagram"
                    name="socialLinks.instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="socialLinks.leetcode"
                    className="block text-sm font-medium mb-2"
                  >
                    LeetCode
                  </label>
                  <input
                    type="url"
                    id="socialLinks.leetcode"
                    name="socialLinks.leetcode"
                    value={formData.socialLinks.leetcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://leetcode.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/dashboard">
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
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 rounded-lg transition-colors flex items-center space-x-2"
              >
                {loading && <LoadingSpinner size="small" />}
                <span>Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
