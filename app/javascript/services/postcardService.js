export const fetchAllPostcards = async (page = 1) => {
  try {
    const url = `/api/v1/postcards/index?page=${page}`;
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

export const searchPostcards = async (query, page = 1) => {
  try {
    const url = `/api/v1/search/postcards/?q=${query}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error("The request failed: ", error);
  }
};
