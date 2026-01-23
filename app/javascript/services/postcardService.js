export const fetchAllPostcards = async () => {
  try {
    const url = "/api/v1/postcards/index";
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error("Fetch All failed:", error);
  }
};

export const fetchPostcard = async (id) => {
  try {
    const url = `/api/v1/show/${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error("The request failed: ", error);
  }
};

export const searchPostcards = async (query) => {
  try {
    const url = `/api/v1/search/postcards/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error("The request failed: ", error);
  }
};
