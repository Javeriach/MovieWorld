import { Children } from 'react';

function CreateSingleMovieElement({
  id,
  Title,
  Poster,
  Year,
  runTime,
  imdbRating,
  userRating,
  selectedMovieDisplayHandler,
}) {
  const selectedMovieDisplay = (event) => {
    selectedMovieDisplayHandler((ps) => (ps === id ? null : id));
  };

  return (
    <div onClick={selectedMovieDisplay}>
      
        
          {Poster !== 'N/A' && Title !== '' && Year !== '' ? (
            <div
              className={` d-flex  align-items-center justify-content-evenly list-group-item item movieListElement`}
            >
              {/* first poster part */}
              <div className="poster_container">
                <img
                  src={Poster}
                  alt={Title}
                  className="poster bg-light mt-0"
                />
              </div>

              {/* second part */}

              <div className="textContainer m-0 p-0">
                <p className="title m-0 p-0">{Title}</p>

                {Year !== undefined ? (
                  <p className="= p-0 m-0">{Year}</p>
                ) : (
                  <div className="d-flex justify-content-between w-75">
                    <p>{imdbRating}</p>
                    <p>{userRating}</p>
                    <p>{runTime}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ''
          )}
     
      
    </div>
  );
}

export default CreateSingleMovieElement;
