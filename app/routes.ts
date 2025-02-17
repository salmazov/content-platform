import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "/photo/:id",
    file: "routes/photo.tsx",
  },
] satisfies RouteConfig;
