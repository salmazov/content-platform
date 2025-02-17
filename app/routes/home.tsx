import type { Route } from "./+types/home";

import PhotoGrid from "../components/PhotoGrid";

import { ErrorBoundary } from "../components/ErrorBoundary";

export { ErrorBoundary };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return  <PhotoGrid />
  ;
}
