import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewPostcard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/postcards/create";

    if (title.length == 0 || author.length == 0 || year.length == 0) return;

    const body = {
      title,
      author,
      year: year,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/postcard/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new postcard to our awesome postcard collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="postcardTitle">Postcard title</label>
              <input
                type="text"
                name="title"
                id="postcardTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postcardAuthor">Author</label>
              <input
                type="text"
                name="author"
                id="postcardAuthor"
                className="form-control"
                required
                onChange={(event) => onChange(event, setAuthor)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postcardYear">Year</label>
              <input
                type="text"
                name="year"
                id="postcardYear"
                className="form-control"
                required
                onChange={(event) => onChange(event, setYear)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Postcard
            </button>
            <Link to="/postcards" className="btn btn-link mt-3">
              Back to postcards
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostcard;
