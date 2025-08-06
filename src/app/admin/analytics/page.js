"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import {
  useResumeAnalyticsSummary,
  useResumeViewsList,
} from "../../../hooks/useResumeAnalyticsData";
import { LoadingSpinner } from "../../components/Loading";

// Chart component for daily views
const DailyViewsChart = ({ dailyViews }) => {
  const maxViews = Math.max(...Object.values(dailyViews), 1);

  return (
    <div className="space-y-2">
      {Object.entries(dailyViews).map(([date, views]) => (
        <div key={date} className="flex items-center space-x-2">
          <span className="text-sm text-gray-400 w-20">
            {new Date(date).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div
              className="bg-[#E9C46A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(views / maxViews) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-300 w-8">{views}</span>
        </div>
      ))}
    </div>
  );
};

// Source distribution component
const SourceStats = ({ sourceStats, topSources }) => {
  const totalViews = Object.values(sourceStats).reduce(
    (sum, count) => sum + count,
    0
  );

  const sourceEmojis = {
    linkedin: "💼",
    github: "👨‍💻",
    website: "🌐",
    youtube: "📺",
    reddit: "🤖",
    friends: "👥",
    colleague: "🏢",
    other: "🔗",
    direct: "🔗",
  };

  return (
    <div className="space-y-3">
      {topSources.map(([source, count]) => (
        <div key={source} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{sourceEmojis[source] || "🔗"}</span>
            <span className="text-sm text-gray-300 capitalize">{source}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-700 rounded-full h-2">
              <div
                className="bg-[#2a9d8f] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(count / totalViews) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-300 w-8">{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Recent views table
const RecentViewsTable = ({ views }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2 text-gray-400">Date</th>
            <th className="text-left py-2 text-gray-400">Email</th>
            <th className="text-left py-2 text-gray-400">Source</th>
            <th className="text-left py-2 text-gray-400">Time</th>
          </tr>
        </thead>
        <tbody>
          {views.map((view) => (
            <tr
              key={view.id}
              className="border-b border-gray-800 hover:bg-gray-800/50"
            >
              <td className="py-2 text-gray-300">
                {view.timestamp?.toLocaleDateString()}
              </td>
              <td className="py-2 text-gray-300">{view.email}</td>
              <td className="py-2">
                <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300 capitalize">
                  {view.source}
                </span>
              </td>
              <td className="py-2 text-gray-400">
                {view.timestamp?.toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ResumeAnalytics() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const {
    analytics,
    loading: analyticsLoading,
    error,
    refreshAnalytics,
  } = useResumeAnalyticsSummary();
  const { views, loading: viewsLoading } = useResumeViewsList();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, authLoading, router]);

  if (authLoading || analyticsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-400 mb-2">
              Error Loading Analytics
            </h2>
            <p className="text-red-300">{error}</p>
            <button
              onClick={refreshAnalytics}
              className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
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
              <h1 className="text-2xl font-bold">Resume Analytics</h1>
            </div>
            <button
              onClick={refreshAnalytics}
              className="bg-[#E9C46A] hover:bg-[#F4A261] text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {analytics ? (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Views</p>
                    <p className="text-3xl font-bold">{analytics.totalViews}</p>
                  </div>
                  <div className="text-4xl opacity-50">👀</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Unique Visitors</p>
                    <p className="text-3xl font-bold">
                      {analytics.uniqueEmails}
                    </p>
                  </div>
                  <div className="text-4xl opacity-50">👥</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Last 30 Days</p>
                    <p className="text-3xl font-bold">
                      {analytics.viewsLast30Days}
                    </p>
                  </div>
                  <div className="text-4xl opacity-50">📅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Top Source</p>
                    <p className="text-lg font-bold capitalize">
                      {analytics.topSources[0]?.[0] || "None"}
                    </p>
                    <p className="text-orange-100 text-sm">
                      {analytics.topSources[0]?.[1] || 0} views
                    </p>
                  </div>
                  <div className="text-4xl opacity-50">🏆</div>
                </div>
              </div>
            </div>

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Views Chart */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Daily Views (Last 7 Days)
                </h3>
                <DailyViewsChart dailyViews={analytics.dailyViews} />
              </div>

              {/* Source Distribution */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Traffic Sources
                </h3>
                <SourceStats
                  sourceStats={analytics.sourceStats}
                  topSources={analytics.topSources}
                />
              </div>
            </div>

            {/* Recent Views Table */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">🕐</span>
                Recent Views
              </h3>
              {viewsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="medium" />
                </div>
              ) : (
                <RecentViewsTable views={analytics.latestViews} />
              )}
            </div>

            {/* Export Options */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">📤</span>
                Export Data
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(analytics, null, 2);
                    const dataBlob = new Blob([dataStr], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `resume-analytics-${
                      new Date().toISOString().split("T")[0]
                    }.json`;
                    link.click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => {
                    const csvContent = [
                      "Date,Email,Source,Timestamp",
                      ...views.map(
                        (view) =>
                          `${view.timestamp?.toLocaleDateString()},${
                            view.email
                          },${view.source},${view.timestamp?.toISOString()}`
                      ),
                    ].join("\n");

                    const dataBlob = new Blob([csvContent], {
                      type: "text/csv",
                    });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `resume-views-${
                      new Date().toISOString().split("T")[0]
                    }.csv`;
                    link.click();
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2">No Analytics Data</h2>
            <p className="text-gray-400">
              Resume views will appear here once people start accessing your
              resume.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
