import type { Route } from "./+types/home";
import PhotoGrid from "../components/PhotoGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>
      <h1>Random Photos from Pexels</h1>
      <PhotoGrid />
  </div>;
}
