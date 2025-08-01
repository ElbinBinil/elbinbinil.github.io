import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// Get all projects
export const getProjects = async () => {
  try {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Get featured projects only
export const getFeaturedProjects = async () => {
  try {
    const q = query(
      collection(db, "projects"),
      where("featured", "==", true),
      orderBy("order", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
};

// Get work experience
export const getWorkExperience = async () => {
  try {
    const q = query(collection(db, "workExperience"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching work experience:", error);
    return [];
  }
};

// Get profile information
export const getProfile = async () => {
  try {
    const docRef = doc(db, "profile", "main");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log("No profile document found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

// Get education information
export const getEducation = async () => {
  try {
    const q = query(collection(db, "education"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
};

// Get skills
export const getSkills = async () => {
  try {
    const q = query(collection(db, "skills"), orderBy("category", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
