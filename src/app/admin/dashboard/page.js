"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { signOutUser } from "../../../lib/auth";
import { useQuickAnalytics } from "../../../hooks/useQuickAnalytics";
import { LoadingSpinner } from "../../components/Loading";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const { quickStats, loading: analyticsLoading } = useQuickAnalytics();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
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
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{user.displayName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Management */}
          <Link href="/admin/projects">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Projects</h3>
                  <p className="text-blue-100">
                    Manage your portfolio projects
                  </p>
                </div>
                <div className="text-4xl opacity-50">🚀</div>
              </div>
            </div>
          </Link>

          {/* Work Experience Management */}
          <Link href="/admin/work-experience">
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg hover:from-green-700 hover:to-green-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Work Experience
                  </h3>
                  <p className="text-green-100">Manage your work history</p>
                </div>
                <div className="text-4xl opacity-50">💼</div>
              </div>
            </div>
          </Link>

          {/* Education Management */}
          <Link href="/admin/education">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-lg hover:from-indigo-700 hover:to-indigo-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-indigo-100">
                    Manage your education history
                  </p>
                </div>
                <div className="text-4xl opacity-50">🎓</div>
              </div>
            </div>
          </Link>

          {/* Profile Management */}
          <Link href="/admin/profile">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Profile</h3>
                  <p className="text-purple-100">Update your personal info</p>
                </div>
                <div className="text-4xl opacity-50">👤</div>
              </div>
            </div>
          </Link>

          {/* View Portfolio */}
          <Link href="/">
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-lg hover:from-orange-700 hover:to-orange-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">View Portfolio</h3>
                  <p className="text-orange-100">See your live portfolio</p>
                </div>
                <div className="text-4xl opacity-50">🌐</div>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/admin/analytics">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-lg hover:from-yellow-700 hover:to-yellow-900 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Resume Analytics
                  </h3>
                  <p className="text-yellow-100">
                    View resume viewing statistics
                  </p>
                </div>
                <div className="text-4xl opacity-50">📊</div>
              </div>
            </div>
          </Link>

          {/* Settings */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Settings</h3>
                <p className="text-red-100">Coming soon...</p>
              </div>
              <div className="text-4xl opacity-50">⚙️</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="block text-blue-400 hover:text-blue-300"
              >
                + Add New Project
              </Link>
              <Link
                href="/admin/work-experience/new"
                className="block text-green-400 hover:text-green-300"
              >
                + Add Work Experience
              </Link>
              <Link
                href="/admin/education/new"
                className="block text-indigo-400 hover:text-indigo-300"
              >
                + Add Education
              </Link>
              <Link
                href="/admin/profile"
                className="block text-purple-400 hover:text-purple-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Resume Analytics</h4>
            {analyticsLoading ? (
              <div className="flex justify-center py-2">
                <LoadingSpinner size="small" />
              </div>
            ) : quickStats ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Views:</span>
                  <span className="text-white font-medium">
                    {quickStats.totalViews}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Today:</span>
                  <span className="text-green-400 font-medium">
                    {quickStats.todayViews}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last 7 days:</span>
                  <span className="text-blue-400 font-medium">
                    {quickStats.viewsLast7Days}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top Source:</span>
                  <span className="text-yellow-400 font-medium capitalize">
                    {quickStats.topSource}
                  </span>
                </div>
                <Link
                  href="/admin/analytics"
                  className="inline-block text-xs text-blue-400 hover:text-blue-300 mt-2"
                >
                  View detailed analytics →
                </Link>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                No analytics data available yet.
              </p>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">System Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
