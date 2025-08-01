import { useState, useEffect } from "react";
import {
  getProjects,
  getFeaturedProjects,
  getWorkExperience,
  getProfile,
  getEducation,
  getSkills,
} from "../lib/firestore";

// Hook for projects
export const useProjects = (featuredOnly = false) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = featuredOnly
          ? await getFeaturedProjects()
          : await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [featuredOnly]);

  return { projects, loading, error };
};

// Hook for work experience
export const useWorkExperience = () => {
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        setLoading(true);
        const data = await getWorkExperience();
        setWorkExperience(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching work experience:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperience();
  }, []);

  return { workExperience, loading, error };
};

// Hook for profile
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

// Hook for education
export const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await getEducation();
        setEducation(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching education:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};

// Hook for skills
export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};
