import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import SearchBar from "./SearchBar";
import usePostcardsData from "../hooks/usePostcardsData";
import useURLSearchParam from "../hooks/useURLSearchParam";
import Pagination from "./Pagination";

const Postcards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPageFromURL = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPageFromURL);

  const [postcards, setPostcards] = useState([]);
  const {
    postcards: fetchedPostcards,
    totalPostcards,
    loading,
    error,
    perPage,
  } = usePostcardsData(debouncedSearchTerm, currentPage);

  useEffect(() => {
    try {
      if (fetchedPostcards) {
        setPostcards(fetchedPostcards);
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetchedPostcards]);

  useEffect(() => {
    try {
      const initialSearchTerm = searchParams.get("search") || "";
      setSearchTerm(initialSearchTerm);

      const pageFromURL = searchParams.get("page") || "1";
      setCurrentPage(Number(pageFromURL));
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  const handleImmediateSearchChange = (searchValue) => {
    try {
      setSearchTerm(searchValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDebouncedSearchChange = (searchValue) => {
    try {
      setDebouncedSearchTerm(searchValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    try {
      setCurrentPage(page);

      setSearchParams({ search: debouncedSearchTerm, page: page });
    } catch (error) {
      console.error(error);
    }
  };

  const allPostcards = postcards.map((postcard, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={postcard.image}
          className="card-img-top"
          alt={`${postcard.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{postcard.name}</h5>
          <Link to={`/postcard/${postcard.id}`} className="btn custom-button">
            View Postcard
          </Link>
        </div>
      </div>
    </div>
  ));

  const noPostcard = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No postcards yet. Why not <Link to="/new_postcard">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Postcards for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular postcards, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to find.
          </p>
        </div>
      </section>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPostcards={totalPostcards}
        postcardsPerPage={perPage}
        onPageChange={handlePageChange}
      />
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/new_postcard" className="btn custom-button">
              Create New Postcard
            </Link>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading postcards.</p>}
          <div className="row">
            {postcards.length > 0 ? allPostcards : noPostcard}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Postcards;
