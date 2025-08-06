import { useState, useEffect } from "react";
import { getResumeAnalyticsSummary } from "../lib/resumeAnalytics";

export const useQuickAnalytics = () => {
  const [quickStats, setQuickStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        const analytics = await getResumeAnalyticsSummary();

        // Get today's views
        const today = new Date().toISOString().split("T")[0];
        const todayViews = analytics.dailyViews[today] || 0;

        // Get yesterday's views for comparison
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split("T")[0];
        const yesterdayViews = analytics.dailyViews[yesterdayKey] || 0;

        setQuickStats({
          totalViews: analytics.totalViews,
          todayViews,
          yesterdayViews,
          viewsLast7Days: Object.values(analytics.dailyViews).reduce(
            (sum, count) => sum + count,
            0
          ),
          topSource: analytics.topSources[0]?.[0] || "None",
          recentViewsCount: analytics.latestViews.length,
        });
      } catch (error) {
        console.error("Error fetching quick analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickStats();
  }, []);

  return { quickStats, loading };
};
