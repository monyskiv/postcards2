import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Postcard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [postcard, setPostcard] = useState({ title: "" });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setPostcard(response))
      .catch(() => navigate("/postcards"));
  }, [params.id]);

  const deletePostcard = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/postcards"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={postcard.image}
          alt={`${postcard.title} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {postcard.title}
        </h1>
      </div>
      <div className="col-sm-12 col-lg-2">
        <button
          type="button"
          className="btn btn-danger"
          onClick={deletePostcard}
        >
          Delete Postcard
        </button>
      </div>
      <Link to="/postcards" className="btn btn-link">
        Back to postcards
      </Link>
    </div>
  );
};

export default Postcard;
