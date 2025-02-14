import { useEffect, useState } from "react";
import { fetchRandomPhotos } from "../api/pexels";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const images = await fetchRandomPhotos(12); // Fetch 12 images
      setPhotos(images);
      setLoading(false);
    }
    loadPhotos();
  }, []);

  if (loading) return <p>Loading images...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
      {photos.map((photo) => (
        <img key={photo.id} src={photo.src.medium} alt={photo.photographer} style={{ width: "100%", borderRadius: "8px" }} />
      ))}
    </div>
  );
}
