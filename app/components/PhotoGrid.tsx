import {styled} from "styled-components";
import { useState, useEffect, useMemo, useRef } from "react";
import { fetchRandomPhotos } from "../api/pexels";
import { Link } from "react-router-dom";

interface Photo {
  id: string;
  src: { medium: string };
  photographer: string;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px; // Reduce gap slightly to balance padding
  padding: 16px;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    padding: 24px;
  }
`;


const StyledImage = styled.img`
  width: 100%;
  padding: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;



export default function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const newPhotos = await fetchRandomPhotos(20, page); // Load 20 photos per request
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setLoading(false);
    }
    loadPhotos();
  }, [page]);

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

  if (loading && photos.length === 0) return <p>Loading images...</p>;

  return (
    <GridContainer>
      {memoizedPhotos.map((photo, index) => (
        <Link key={`${photo.id}-${index}`} to={`/photo/${photo.id}`}>
          <StyledImage
            src={photo.src.medium}
            alt={photo.photographer}
          />
        </Link>
      ))}
      {/* Observer Target */}
      <div ref={lastPhotoRef} style={{ height: "1px" }} />
    </GridContainer>
  );
}
