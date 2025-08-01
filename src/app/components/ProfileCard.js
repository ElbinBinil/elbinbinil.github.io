import { useProfile } from "../../hooks/useFirestore";
import { LoadingProfile } from "./Loading";
import { Linkedin, Github, Twitter, Mail, Instagram } from "lucide-react";

export default function ProfileCard() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <LoadingProfile />;
  }

  if (error) {
    return <div className="text-red-400">Error loading profile: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-400">No profile data found</div>;
  }

  return (
    <div className="bg-purple-700 p-6 rounded-lg">
      <img
        src={profile.profileImage}
        alt="Profile"
        className="w-full max-w-[200px] mx-auto rounded-lg mb-4"
      />
      <p className="font-bold text-xl">Name: {profile.name}</p>
      <p className="mb-4">Based in: {profile.location}</p>
      <div className="flex justify-center space-x-4">
        {profile.socialLinks?.linkedin && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.socialLinks.linkedin}
          >
            <Linkedin className="w-6 h-6" />
          </a>
        )}
        {profile.socialLinks?.github && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.socialLinks.github}
          >
            <Github className="w-6 h-6" />
          </a>
        )}
        {profile.socialLinks?.twitter && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.socialLinks.twitter}
          >
            <Twitter className="w-6 h-6" />
          </a>
        )}
        {profile.socialLinks?.instagram && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.socialLinks.instagram}
          >
            <Instagram className="w-6 h-6" />
          </a>
        )}
        {profile.socialLinks?.email && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${profile.socialLinks.email}`}
          >
            <Mail className="w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
}
