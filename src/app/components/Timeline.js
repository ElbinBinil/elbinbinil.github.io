import React from "react";

export const Timeline = ({ data }) => {
  return (
    <div className="w-full font-sans">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 text-white font-bold max-w-4xl">
          My Professional Journey
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl">
          Here&apos;s a timeline of my career milestones and professional growth
          over the years.
        </p>
      </div>
      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                <div className="h-4 w-4 rounded-full bg-white border-2 border-gray-300" />
              </div>
              <h3 className="hidden md:block text-lg md:pl-20 md:text-2xl font-bold text-gray-300">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-gray-300">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: `${data.length * 40}vh`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const WorkExperienceTimeline = ({ workExperience }) => {
  const timelineData =
    workExperience
      ?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .map((work, index) => ({
        title: `${work.startDate} - ${work.endDate || "Present"}`,
        content: (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-8">
            <div className="mb-4">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {work.position}
              </h3>
              <p className="text-gray-300 text-lg font-medium mb-2 flex items-center">
                <span className="mr-2">🏢</span>
                {work.company}
              </p>
            </div>

            {work.description && (
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-4 bg-gray-800/50 p-4 rounded-lg border-l-4 border-cyan-400">
                {work.description}
              </p>
            )}

            {work.skills && work.skills.length > 0 && (
              <div>
                <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center">
                  <span className="mr-2">⚡</span>
                  Skills & Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {work.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full border border-cyan-400/30 hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
      })) || [];

  return <Timeline data={timelineData} />;
};
