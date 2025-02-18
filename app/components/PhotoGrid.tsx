import { useState, useEffect, useRef, useMemo } from "react";
import { fetchPhotos } from "../api/pexels";
import { Link } from "react-router-dom";
import {styled} from "styled-components";

// Styled Components for Masonry Grid
const MasonryGrid = styled.div`
  column-count: auto;
  column-gap: 12px;
  padding: 20px;
  
  @media (min-width: 600px) {
    column-count: 2;
  }
  @media (min-width: 900px) {
    column-count: 3;
  }
  @media (min-width: 1200px) {
    column-count: 4;
  }
`;

const MasonryItem = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
  break-inside: avoid; /* Ensures images don’t break across columns */

  &:hover {
    transform: scale(1.03);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  display: block;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  // 🕒 Debounce Effect (Delays updating `debouncedQuery`)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // Reset pagination when searching
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
    loadPhotos();
  }, [debouncedQuery, page]);

  // Memoize photos to avoid unnecessary re-renders
  const memoizedPhotos = useMemo(() => photos, [photos]);

  // 🔄 Intersection Observer for Infinite Scrolling
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastPhotoRef.current) {
      observerRef.current.observe(lastPhotoRef.current);
    }
  }, [memoizedPhotos, loading]);

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
          !loading && <p>No images found</p>
        )}
        {/* Observer Target for Infinite Scroll */}
        <div ref={lastPhotoRef} style={{ height: "1px" }} />
      </MasonryGrid>

      {loading && <p>Loading images...</p>}
    </>
  );
}