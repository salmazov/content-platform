import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhotoById } from "../api/pexels";

// Import styled components
import {
  Container,
  BackButton,
  StyledImageWrapper,
  StyledImage,
  PhotographerLink,
  Info,
  BoldText,
} from "./PhotoDetails.styles";

export default function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Hydration fix

  useEffect(() => {
    setIsClient(true); // Ensure rendering happens only on client
  }, []);
  
  useEffect(() => {
    async function loadPhoto() {
      setLoading(true);
      const data = await fetchPhotoById(id!);
      setPhoto(data);
      setLoading(false);
    }
    loadPhoto();
  }, [id]);

  if (!isClient) return null; // Prevents server rendering issues
  if (loading) return <Container><p>Loading...</p></Container>;
  if (!photo) return <Container><p>Photo not found.</p></Container>;

  return (
    <Container key={id}> {/*  Forces re-mount on new photo selection */}
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      {/* Centered Image */}
      <StyledImageWrapper>
        <StyledImage src={photo.src.large2x || photo.src.original} alt={photo.alt || "Photo"} />
      </StyledImageWrapper>

      {/* Photographer Info */}
      <h2>{photo.photographer}</h2>
      <PhotographerLink href={photo.photographer_url} target="_blank">
        View Photographer Profile
      </PhotographerLink>

      {/* Description (Fallback if `alt` is empty) */}
      <Info>
        <BoldText>Description:</BoldText> {photo.alt || "No description available"}
      </Info>
    </Container>
  );
}
