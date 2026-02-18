import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchPostcards, fetchAllPostcards } from "../services/postcardService"

function usePostcardsData(searchTerm, page = 1) {
  const navigate = useNavigate();
  const [postcards, setPostcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPostcards, setTotalPostcards] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    async function loadPostcards() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPostcards(searchTerm, page);
        } else {
          data = await fetchAllPostcards(page);
        }
        if (data.postcards) {
          setPostcards(data.postcards);
          setTotalPostcards(data.total_count);
          setPerPage(data.per_page);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error('Failed to fetch postcards: ', e);
        navigate('/');
      }
    }
    loadPostcards();

  }, [searchTerm, page]);

  return { postcards, loading, error, totalPostcards, perPage };
}

export default usePostcardsData;