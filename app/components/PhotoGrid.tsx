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
  const [query, setQuery] = useState(""); // 🔍 Stores search keyword
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const newPhotos = await fetchPhotos(query, 20, page);
      setPhotos((prevPhotos) => (page === 1 ? newPhotos : [...prevPhotos, ...newPhotos]));
      setLoading(false);
    }
    loadPhotos();
  }, [query, page]);

  // Memoize the photos array to avoid re-computation on re-renders
  const memoizedPhotos = useMemo(() => photos, [photos]);

  // Intersection Observer for Infinite Scrolling
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // Load next batch of images
      }
    });

    if (lastPhotoRef.current) {
      observerRef.current.observe(lastPhotoRef.current);
    }
  }, [memoizedPhotos]);

  return (
    <>
      {/* 🔍 Search Input */}
      <SearchInput
        type="text"
        placeholder="Search photos..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // Reset page when searching
        }}
      />

      {/* 🔹 Grid Container */}
      <GridContainer>
        {memoizedPhotos.map((photo, index) => (
          <Link key={`${photo.id}-${index}`} to={`/photo/${photo.id}`}>
            <StyledImage src={photo.src.medium} alt={photo.photographer} />
          </Link>
        ))}
        {/* Observer Target for Infinite Scroll */}
        <div ref={lastPhotoRef} style={{ height: "1px" }} />
      </GridContainer>

      {loading && <p>Loading images...</p>}
    </>
  );
}
