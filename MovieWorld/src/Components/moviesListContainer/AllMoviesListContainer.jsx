import React, { useEffect, useState } from 'react';
import CreateSingleMovieElement from '../ResuseAble/CreateSingleMovieElement';
import LoadingStatement from './LoadingStatement';
import ErrorMessage from './ErrorMessage';

function AllMoviesListContainer({
  tempMovieData,
  movieTitle,
  selectedMovieDisplayHandler,
  error,
  isLoading,
}) {
  let [isMovieListOpen, setMovieListOpened] = useState(true);

  return (
    <div className="AllMovieListContainer overFlow">
      <div className="d-flex justify-content-end w-100 ">
        <button
          className="btn text-light ShowHideBtn"
          onClick={() => setMovieListOpened((ps) => !ps)}
        >
          {isMovieListOpen ? '-' : '+'}
        </button>
      </div>

      {/* loading */}

      {isLoading && (
        <div className="d-flex justify-content-center align-items-center w-100 h-75  ">
          <LoadingStatement />
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center align-items-center w-100 h-75  ">
          <ErrorMessage Error={error} />
        </div>
      )}

      {/* conditinal importing the movies depending on the data fetched without error */}

      {!isLoading && !error && (
        <div className={`${isMovieListOpen ? '' : 'd-none'} `}>
          {tempMovieData.map((element, index) => (
            <CreateSingleMovieElement
              id={element.imdbID}
              Title={element.Title}
              Poster={element.Poster}
              Year={'💴' + ' ' + element.Year}
              key={index}
              selectedMovieDisplayHandler={selectedMovieDisplayHandler}
            >
              {' '}
            </CreateSingleMovieElement>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllMoviesListContainer;
