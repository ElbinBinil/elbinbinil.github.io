import { useProjects } from "../../hooks/useFirestore";
import { LoadingCard } from "./Loading";

export default function ProjectsList() {
  const { projects, loading, error } = useProjects(true); // Get featured projects only

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Error loading projects: {error}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div className="text-gray-400">No projects found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-800 p-2 rounded-lg">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.githubUrl || project.liveUrl}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto rounded-lg"
            />
            <h1 className="text-sm md:text-base pt-2 font-bold">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-xs text-gray-400 mt-1">
                {project.description}
              </p>
            )}
            {project.technologies && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </a>
        </div>
      ))}
    </div>
  );
}
