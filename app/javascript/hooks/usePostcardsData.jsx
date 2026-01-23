import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchPostcards, fetchAllPostcards } from "../services/postcardService"

function usePostcardsData(searchTerm) {
  const navigate = useNavigate();
  const [postcards, setPostcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPostcards() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPostcards(searchTerm);
        } else {
          data = await fetchAllPostcards();
        }
        setPostcards(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error('Failed to fetch posts: ', e);
        navigate('/');
      }
    }
    loadPostcards();

  }, [searchTerm]);

  return { postcards, loading, error };
}

export default usePostcardsData;