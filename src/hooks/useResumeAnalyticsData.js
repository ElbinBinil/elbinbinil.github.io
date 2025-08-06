import { useState, useEffect } from "react";
import {
  getResumeAnalyticsSummary,
  getResumeViews,
} from "../lib/resumeAnalytics";

export const useResumeAnalyticsSummary = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getResumeAnalyticsSummary();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resume analytics summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const refreshAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getResumeAnalyticsSummary();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error refreshing resume analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  return { analytics, loading, error, refreshAnalytics };
};

export const useResumeViewsList = () => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        setLoading(true);
        const data = await getResumeViews();
        setViews(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resume views:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, []);

  return { views, loading, error };
};
