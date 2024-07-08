import { useEffect, useState, useRef } from 'react';
import { useKey } from '../useKey';
import StarRating from '../Stars/StarRating';
function SelectedMovieDisplay({
  movieDetails,
  onCloseMovie,
  setRating,
  addToListHandler,
}) {
  const setSelectedIDNull = () => {
    onCloseMovie();
  };

  useKey('Escape', onCloseMovie);

  let movieRatingHandler = (rating) => {
    setRating(rating, id);
  };

  let {
    id,
    userRating,
    title,
    year,
    poster,
    runTime,
    imdbRating,
    plot,
    released,
    actors,
    director,
    genre,
  } = movieDetails;

  let userRatingRef = useRef(0);
  useEffect(() => {
    userRatingRef.current = userRatingRef.current + 1;
  }, [userRating]);
  return (
    <div>
      <div>
        {/* //backArrow button */}

        <button className="backArrow" alt="" onClick={setSelectedIDNull}>
          &larr;
        </button>
      </div>

      {/* Movie details */}
      <header className="DisplayMovieHeader">
        <img src={poster} alt={`${title}`} />

        <div className="DisplayMovieHeaderTextSection">
          <h4>{title}</h4>
          <p className="m-0 p-0">
            📅 {released} &bull; {runTime}
          </p>
          <p>🧬{genre}</p>
          <p>
            <span>🌟</span>
            {imdbRating} IMDB Rating
          </p>
        </div>
      </header>

      <div className="star--rating-main  ">
        <div className="star--rating">
          <StarRating
            size="20px"
            starNo={10}
            defaultRating={Number(userRating)}
            movieRatingHandler={movieRatingHandler}
          />
          {userRating ? (
            <div className="d-flex justify-content-center mt-2">
              <button
                className="add-to-list-btn"
                onClick={addToListHandler}
              >
                Add Movie to the List
              </button>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="detail-para d-flex justify-content-center">
          <p>{plot}</p>
        </div>
      </div>
    </div>
  );
}

export default SelectedMovieDisplay;
