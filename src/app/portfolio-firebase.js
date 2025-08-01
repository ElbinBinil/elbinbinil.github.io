"use client";
import React from "react";
import Head from "next/head";
import { useProfile } from "../hooks/useFirestore";
import { LoadingSpinner } from "./components/Loading";
import ProfileCard from "./components/ProfileCard";
import ProjectsList from "./components/ProjectsList";
import WorkExperienceList from "./components/WorkExperienceList";

const PortfolioLayout = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{profile?.name || "Portfolio"}</title>
      </Head>
      <div className="w-full h-42 overflow-y-scroll no-scrollbar">
        <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="bg-midnight p-4 rounded-3xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Bringing Your Ideas To Life Through code 🧑🏼‍💻
                  </h1>
                  <p className="text-gray-400 mb-6">
                    {profile?.bio ||
                      "Passionate developer creating amazing web experiences"}
                  </p>
                  <a
                    href={`mailto:${
                      profile?.socialLinks?.email || "hello@example.com"
                    }`}
                  >
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors">
                      Slide a 👋
                    </button>
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 my-8">
                  <div className="bg-green-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">
                      {profile?.yearsExperience || 2}+
                    </p>
                    <p className="text-sm md:text-base">Years Experience</p>
                  </div>
                  <div className="bg-yellow-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">
                      {profile?.projectsHandled || 10}+
                    </p>
                    <p className="text-sm md:text-base">Handled Projects</p>
                  </div>
                  <div className="bg-red-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">2</p>
                    <p className="text-sm md:text-base">On progress</p>
                  </div>
                </div>
              </div>

              {/* Profile section */}
              <ProfileCard />
            </div>

            {/* Portfolio section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile?.socialLinks?.github || "https://github.com"}
                >
                  <button className="text-gray-400 hover:text-white transition-colors">
                    See All
                  </button>
                </a>
              </div>
              <ProjectsList />
            </div>

            {/* Work Experience section */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Work Experience
              </h2>
              <WorkExperienceList />
            </div>

            {/* About section */}
            <div className="bg-midnight p-4 rounded-3xl mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">About</h2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile?.resumeUrl}
                >
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Resume
                  </button>
                </a>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {profile?.bio ||
                  "Highly motivated aspiring developer with strong problem-solving skills, eager to learn from experienced professionals and make a meaningful contribution to a dynamic team. Passionate about exploring the field of data analytics and web development"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
