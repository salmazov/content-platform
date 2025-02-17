import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhotoById } from "../api/pexels";

export function meta() {
  return [
    { title: "Photo Details" },
    { name: "description", content: "View photo details from Pexels" },
  ];
}

export default function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhoto() {
      setLoading(true);
      const data = await fetchPhotoById(id!);
      setPhoto(data);
      setLoading(false);
    }
    loadPhoto();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!photo) return <p>Photo not found.</p>;
  console.log(photo);
  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#fff" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          background: "none",
          color: "#fff",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <img 
        src={photo.src.large} 
        alt={photo.alt || "Photo"} 
        style={{ maxWidth: "90%", borderRadius: "8px", marginBottom: "20px" }}
      />

      <h2>{photo.photographer}</h2>
      <p><strong>Description:</strong> {photo.alt || "No description available"}</p>
      {photo.created_at && <p><strong>Date Taken:</strong> {new Date(photo.created_at).toDateString()}</p>}
    </div>
  );
}
