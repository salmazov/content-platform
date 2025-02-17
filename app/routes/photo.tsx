import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhotoById } from "../api/pexels";
import {styled} from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: #fff;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  border-radius: 8px;
  margin-bottom: 20px;
  object-fit: contain;
`;

const Info = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

const BoldText = styled.strong`
  font-weight: bold;
`;

// Main Component
export default function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false); // Prevents hydration issues

  useEffect(() => {
    setIsHydrated(true); // Set hydration flag when client loads
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

  // Prevent rendering until hydrated
  if (!isHydrated) return null;

  if (loading) return <Container><p>Loading...</p></Container>;
  if (!photo) return <Container><p>Photo not found.</p></Container>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <StyledImage src={photo.src.large} alt={photo.alt || "Photo"} />
      <h2>{photo.photographer}</h2>
      <Info>
        <BoldText>Description:</BoldText> {photo.alt || "No description available"}
      </Info>
      {photo.created_at && (
        <Info>
          <BoldText>Date Taken:</BoldText> {new Date(photo.created_at).toDateString()}
        </Info>
      )}
    </Container>
  );
}
