import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export const useResumeAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveResumeView = async (email, source, userAgent = "") => {
    setLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "resumeViews"), {
        email: email.toLowerCase().trim(),
        source,
        userAgent,
        timestamp: Timestamp.now(),
        viewDate: new Date().toISOString(),
        ip: "", // You can add IP tracking if needed
      });

      console.log("Resume view logged with ID: ", docRef.id);
      return docRef.id;
    } catch (err) {
      console.error("Error logging resume view: ", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveResumeView,
    loading,
    error,
  };
};
