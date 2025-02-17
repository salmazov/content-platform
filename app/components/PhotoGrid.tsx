import { useEffect, useState, useRef, useCallback } from "react";
import { fetchRandomPhotos } from "../api/pexels";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the page number for pagination
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const images = await fetchRandomPhotos(20, page); // Fetch 20 images per page
      setPhotos((prev) => [...prev, ...images]); // Append new images instead of replacing
      setLoading(false);
    }
    loadPhotos();
  }, [page]); // Fetch new images when the page number changes

  // Callback for Intersection Observer
  const lastPhotoCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1); // Load next page of images
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (loading && photos.length === 0) return <p>Loading images...</p>;

  return (
    <div style={{ columnCount: 3, columnGap: "10px" }}>
      {photos.map((photo, index) => (
        <div key={photo.id} ref={index === photos.length - 1 ? lastPhotoCallback : null}>
          <img
            src={photo.src.medium}
            alt={photo.photographer}
            style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
          />
        </div>
      ))}
      {loading && <p>Loading more...</p>}
    </div>
  );
}
