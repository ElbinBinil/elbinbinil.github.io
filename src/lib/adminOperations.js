import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";

// Projects CRUD
export const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "projects", projectId));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Work Experience CRUD
export const addWorkExperience = async (workData) => {
  try {
    const docRef = await addDoc(collection(db, "workExperience"), {
      ...workData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding work experience:", error);
    throw error;
  }
};

export const updateWorkExperience = async (workId, workData) => {
  try {
    const workRef = doc(db, "workExperience", workId);
    await updateDoc(workRef, {
      ...workData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating work experience:", error);
    throw error;
  }
};

export const deleteWorkExperience = async (workId) => {
  try {
    await deleteDoc(doc(db, "workExperience", workId));
  } catch (error) {
    console.error("Error deleting work experience:", error);
    throw error;
  }
};

// Profile CRUD
export const updateProfile = async (profileData) => {
  try {
    const profileRef = doc(db, "profile", "main");
    await setDoc(
      profileRef,
      {
        ...profileData,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Get all data for admin
export const getAllProjects = async () => {
  try {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

export const getAllWorkExperience = async () => {
  try {
    const q = query(collection(db, "workExperience"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching all work experience:", error);
    throw error;
  }
};

// Education CRUD
export const addEducation = async (educationData) => {
  try {
    const docRef = await addDoc(collection(db, "education"), {
      ...educationData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding education:", error);
    throw error;
  }
};

export const updateEducation = async (educationId, educationData) => {
  try {
    const educationRef = doc(db, "education", educationId);
    await updateDoc(educationRef, {
      ...educationData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating education:", error);
    throw error;
  }
};

export const deleteEducation = async (educationId) => {
  try {
    await deleteDoc(doc(db, "education", educationId));
  } catch (error) {
    console.error("Error deleting education:", error);
    throw error;
  }
};

export const getAllEducation = async () => {
  try {
    const q = query(collection(db, "education"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching all education:", error);
    throw error;
  }
};
