import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";

// Get all resume views
export const getResumeViews = async () => {
  try {
    const q = query(
      collection(db, "resumeViews"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    }));
  } catch (error) {
    console.error("Error fetching resume views:", error);
    throw error;
  }
};

// Get resume views by date range
export const getResumeViewsByDateRange = async (startDate, endDate) => {
  try {
    const start = Timestamp.fromDate(startDate);
    const end = Timestamp.fromDate(endDate);

    const q = query(
      collection(db, "resumeViews"),
      where("timestamp", ">=", start),
      where("timestamp", "<=", end),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    }));
  } catch (error) {
    console.error("Error fetching resume views by date range:", error);
    throw error;
  }
};

// Get resume analytics summary
export const getResumeAnalyticsSummary = async () => {
  try {
    const allViews = await getResumeViews();

    // Calculate summary statistics
    const totalViews = allViews.length;
    const uniqueEmails = new Set(allViews.map((view) => view.email)).size;

    // Views by source
    const sourceStats = {};
    allViews.forEach((view) => {
      sourceStats[view.source] = (sourceStats[view.source] || 0) + 1;
    });

    // Views by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentViews = allViews.filter(
      (view) => view.timestamp && view.timestamp >= thirtyDaysAgo
    );

    // Daily views for the last 7 days
    const dailyViews = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      dailyViews[dateKey] = 0;
    }

    recentViews.forEach((view) => {
      const dateKey = view.timestamp.toISOString().split("T")[0];
      if (dailyViews.hasOwnProperty(dateKey)) {
        dailyViews[dateKey]++;
      }
    });

    // Most recent views
    const latestViews = allViews.slice(0, 10);

    return {
      totalViews,
      uniqueEmails,
      viewsLast30Days: recentViews.length,
      sourceStats,
      dailyViews,
      latestViews,
      topSources: Object.entries(sourceStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
    };
  } catch (error) {
    console.error("Error calculating resume analytics summary:", error);
    throw error;
  }
};
