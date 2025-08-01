import { useWorkExperience } from "../../hooks/useFirestore";
import { LoadingSpinner } from "./Loading";

export default function WorkExperienceList() {
  const { workExperience, loading, error } = useWorkExperience();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-400">Error loading work experience: {error}</div>
    );
  }

  if (!workExperience || workExperience.length === 0) {
    return <div className="text-gray-400">No work experience found</div>;
  }

  return (
    <div className="space-y-4">
      {workExperience.map((work) => (
        <div key={work.id} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-white">{work.position}</h3>
          <h4 className="text-md text-cyan-400">{work.company}</h4>
          <p className="text-sm text-gray-400 mb-2">
            {work.startDate} - {work.endDate || "Present"}
          </p>
          {work.description && (
            <p className="text-sm text-gray-300 mb-3">{work.description}</p>
          )}
          {work.skills && (
            <div className="flex flex-wrap gap-2">
              {work.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-purple-600 text-white px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
