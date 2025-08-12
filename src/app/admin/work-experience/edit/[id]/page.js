import WorkExperienceFormClient from "../../new/client";

export async function generateStaticParams() {
  // Return at least one static param for build to work
  // In production, this route will be dynamically handled
  return [{ id: 'placeholder' }];
}

export default function Page() {
  return <WorkExperienceFormClient />;
}
