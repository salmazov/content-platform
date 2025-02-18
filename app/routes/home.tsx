import type { Route } from "./+types/home";

import PhotoGrid from "../components/PhotoGrid";

import { ErrorBoundary } from "../components/ErrorBoundary";

export { ErrorBoundary };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Content Platform" },
    { name: "description", content: "Optimized Virtualized Masonry Grid with Detailed Photo View" },
  ];
}

export default function Home() {
  return  <PhotoGrid />
  ;
}
