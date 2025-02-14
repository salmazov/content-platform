const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com/v1/";

export async function fetchRandomPhotos(perPage = 10) {
  try {
    const response = await fetch(`${BASE_URL}curated?per_page=${perPage}`, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    return data.photos; // Returns an array of photos
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}
