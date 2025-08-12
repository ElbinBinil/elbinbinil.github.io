export async function generateStaticParams() {
  // Return at least one static param for build to work
  // In production, this route will be dynamically handled
  return [{ id: 'placeholder' }];
}

import ProjectFormClient from "../../new/client";

export default function Page() {
  return <ProjectFormClient />;
}
