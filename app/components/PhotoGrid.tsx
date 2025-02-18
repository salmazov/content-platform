import { useState, useEffect, useRef, useMemo } from "react";
import { fetchPhotos } from "../api/pexels";
import { Link } from "react-router-dom";
import {styled} from "styled-components";

// Styled Components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 20px;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
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
  const [query, setQuery] = useState(""); // User input
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Debounced state
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  // 🕒 Debounce Effect (Delays updating `debouncedQuery`)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // Reset pagination when new search starts
    }, 500); // ⏳ 500ms debounce delay

    return () => clearTimeout(handler); // Cleanup timeout on change
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

  // Memoize the photos array to avoid re-computation on re-renders
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

      {/* 🔹 Grid Container */}
      <GridContainer>
        {memoizedPhotos.length > 0 ? (
          memoizedPhotos.map((photo, index) => (
            <Link key={`${photo.id}-${index}`} to={`/photo/${photo.id}`}>
              <StyledImage src={photo.src.medium} alt={photo.photographer} />
            </Link>
          ))
        ) : (
          !loading && <p>No images found</p>
        )}
        
        {/* Observer Target for Infinite Scroll */}
        <div ref={lastPhotoRef} style={{ height: "1px" }} />
      </GridContainer>

      {loading && <p>Loading images...</p>}
    </>
  );
}