import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchRandomPhotos } from "../api/pexels";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const images = await fetchRandomPhotos(20, page);
      setPhotos((prev) => [...prev, ...images]);
      setLoading(false);
    }
    loadPhotos();
  }, [page]);

  const lastPhotoCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
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
        <div key={`${photo.id}-${index}`}  ref={index === photos.length - 1 ? lastPhotoCallback : null}>
          <Link to={`/photo/${photo.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={photo.src.medium}
              alt={photo.photographer}
              style={{ width: "100%", marginBottom: "10px", borderRadius: "8px", cursor: "pointer" }}
            />
          </Link>
        </div>
      ))}
      {loading && <p>Loading more...</p>}
    </div>
  );
}
