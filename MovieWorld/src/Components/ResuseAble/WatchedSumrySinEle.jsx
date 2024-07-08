import { Children } from 'react';

function WatchSumrySinEle({
  id,
  title,
  poster,
  year,
  runtime,
  imdbRating,
  userRating,
  removeMovieHandler = { removeMovieHandler },
}) {
  return (
    <div>
      {
        <div className="d-flex  justify-content-evenly  item">
          <div
            className={` d-flex  align-items-center justify-content-evenly list-group-item  movieListElement`}
          >
            {/* first poster part */}
            <div className="poster_container">
              <img src={poster} alt={title} className="poster bg-light mt-0" />
            </div>

            {/* second part */}

            <div className="textContainer m-0 p-0">
              <p className="title m-0 p-0">{title}</p>

              {year !== undefined ? (
                <p className="= p-0 m-0">{year}</p>
              ) : (
                <div className="d-flex justify-content-between w-75">
                  <p>{imdbRating}</p>
                  <p>{userRating}</p>
                  <p> {runtime}</p>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex deleteItemBtn btn p-0 m-0 border border-0">
            <span
              className="deleteItemBtn "
              onClick={() => removeMovieHandler(id)}
            >
              ❌
            </span>
          </div>
        </div>
      }
    </div>
  );
}

export default WatchSumrySinEle;
