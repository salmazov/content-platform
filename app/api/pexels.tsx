const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com/v1/";

export async function fetchPhotos(query: string = "", perPage = 20, page = 1) {
  try {
    const endpoint = query
      ? `${BASE_URL}search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`
      : `${BASE_URL}curated?per_page=${perPage}&page=${page}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

export async function fetchPhotoById(photoId: string) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
      headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
    });

    if (!response.ok) throw new Error("Failed to fetch photo details");

    return await response.json();
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
}

