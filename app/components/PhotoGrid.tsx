import { useState, useEffect, useRef, useMemo } from "react";
import { fetchPhotos } from "../api/pexels";
import { Link } from "react-router-dom";
import {
  MasonryGrid,
  MasonryItem,
  StyledImage,
  SearchInput,
  LoadingMessage,
  NoResultsMessage,
} from "./PhotoGrid.styles";

interface Photo {
  id: string;
  src: { medium: string };
  photographer: string;
}

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isClient, setIsClient] = useState(false); // ✅ Fix hydration issues
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  // Fix Hydration Issue: Render only on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🕒 Debounce Effect (Delays updating `debouncedQuery`)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // 📸 Fetch Photos when `debouncedQuery` or `page` changes
  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      try {
        const newPhotos = await fetchPhotos(debouncedQuery, 20, page);
        setPhotos((prevPhotos) => (page === 1 ? newPhotos : [...prevPhotos, ...newPhotos]));
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    }
    if (isClient) loadPhotos(); // ✅ Ensure hydration match
  }, [debouncedQuery, page, isClient]);

  // Memoize photos to avoid unnecessary re-renders
  const memoizedPhotos = useMemo(() => photos, [photos]);

  // 🔄 Intersection Observer for Infinite Scrolling
  useEffect(() => {
    if (!isClient) return; // ✅ Ensure consistent rendering
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastPhotoRef.current) {
      observerRef.current.observe(lastPhotoRef.current);
    }
  }, [memoizedPhotos, loading, isClient]);

  // Fix Hydration: Don't render until mounted
  if (!isClient) return null;

  return (
    <>
      {/* 🔍 Search Input with Debounce */}
      <SearchInput
        type="text"
        placeholder="Search photos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 🔹 Masonry Grid Layout */}
      <MasonryGrid>
        {memoizedPhotos.length > 0 ? (
          memoizedPhotos.map((photo, index) => (
            <MasonryItem key={`${photo.id}-${index}`}>
              <Link to={`/photo/${photo.id}`}>
                <StyledImage src={photo.src.medium} alt={photo.photographer} />
              </Link>
            </MasonryItem>
          ))
        ) : (
          !loading && <NoResultsMessage>No images found</NoResultsMessage>
        )}
        <div ref={lastPhotoRef} style={{ height: "1px" }} />
      </MasonryGrid>

      {loading && <LoadingMessage>Loading images...</LoadingMessage>}
    </>
  );
}
