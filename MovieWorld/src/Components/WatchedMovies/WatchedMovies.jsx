import React, { useEffect, useState, useRef } from 'react';
import WatedMoviesSummary from './WatedMoviesSummary';
import SelectedMovieDisplay from './SelectedMovieDisplay';
import LoadingStatement from '../moviesListContainer/LoadingStatement';
import ErrorMessage from '../moviesListContainer/errorMessage';
import WatchSumrySinEle from '../ResuseAble/WatchedSumrySinEle';
import { useLocalStorageState } from '../useLocalStorageState';
import { toast } from 'react-toastify';

function WatchedMovies({ selectToDisplayID, setSelectedToDisplayID }) {

  // =============States
  let [isWatchedMovieFullBoxDataOpen, setWatchedMovieFullBoxDataOpen] =
    useState(true);
  let [singleMovie, setSingleMovie] = useState({});
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState({
    status: false,
    msg: '',
  });

  let [watchMovieList, setWatchedMovieList] = useLocalStorageState(
    [],
    'watchMovieList'
  );

  let [tempSelectedID, setTempSelectedId] = useState(0);
  useEffect(() => {
    setTempSelectedId(selectToDisplayID);
  }, [selectToDisplayID]);
  let key = '1f2b401b';
  let [tosifyMessage, setTosifyMessage] = useState("");
// =============Use Effect
  useEffect(() => {
    
    async function details() {
      try {
        setLoading(true);
        setErrorMsg({
          status: false,
          msg: '',
        });
        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectToDisplayID}`
        );
        if (!res.ok) {
          throw new Error('Data Fetching Failed');
        }
        let result = await res.json();
        if (result.Response === 'False') {
          throw new Error('Movie Details Not found');
        }
        let userRating = 0;
        setSingleMovie(() => {
          if (watchMovieList.length > 0) {
            let alreadyPreMovie = watchMovieList.filter(
              (element) => element.id === selectToDisplayID
            );
            if (alreadyPreMovie.length > 0)
              userRating = alreadyPreMovie[0].userRating;

            return {
              id: selectToDisplayID,
              userRating: userRating,
              title: result.Title,
              year: result.Year,
              poster: result.Poster,
              runTime: result.Runtime,
              imdbRating: result.imdbRating,
              plot: result.Plot,
              released: result.Released,
              actors: result.Actors,
              director: result.Director,
              genre: result.Genre,
            };
          }

          return {
            id: selectToDisplayID,
            userRating: 0,
            title: result.Title,
            year: result.Year,
            poster: result.Poster,
            runTime: result.Runtime,
            imdbRating: result.imdbRating,
            plot: result.Plot,
            released: result.Released,
            actors: result.Actors,
            director: result.Director,
            genre: result.Genre,
          };
        });
        setLoading(false);
      } catch (err) {
        setErrorMsg({
          status: true,
          msg: err.message,
        });
      } finally {
        setLoading(false);
      }
    }

    if (selectToDisplayID) {
      details();
    }
  }, [selectToDisplayID]);

  let removeMovieHandler = (id) => {
    setWatchedMovieList((prs) => {
      let updatedlist = prs.filter((element) => {
        return element.id !== id;
      });
      return updatedlist;
    });
    toast.success("Movie Removed");
  };

  let setRating = (rating, id) => {
    setSingleMovie((pre) => {
      return {
        ...pre,
        userRating: rating,
      };
    });
  };

  let addToListHandler = () => {
    setTosifyMessage("");
    setWatchedMovieList((prs) => {
      let alreadyPreId = 0;

      if (watchMovieList.length > 0) {
        let alreadyPreMovie = watchMovieList.filter(
          (element) => element.id === selectToDisplayID
        );

        //if prsent case or not present case
        if (alreadyPreMovie.length > 0) {
          alreadyPreId = alreadyPreMovie[0].id;
          if (
            alreadyPreId === selectToDisplayID &&
            alreadyPreMovie[0].userRating === singleMovie.userRating //if userRating is same then  not updated otherwise updated
          )
        {  setTosifyMessage("Movie Already Exist in List");
            return prs;
        }
          else {
            let updatedlist = prs.map((element) => {
              if (element.id === selectToDisplayID) {
                return {
                  ...element,
                  userRating: singleMovie.userRating,
                };
              }
              return element;
            });
            setTosifyMessage("Movie Rating updated");

            return updatedlist;
          }
        }
        setTosifyMessage("Movie Added to the List");
        return [...prs, singleMovie];

      }
      //for initail case
      setTosifyMessage("Movie Added to the List");
      return [...prs, singleMovie];
    });
  };

  useEffect(() => {
    if (selectToDisplayID) {
      document.title = ` Movie| ${singleMovie.title}`;
    } else {
      document.title = 'UsePopcorn';
    }
  }, [selectToDisplayID, singleMovie]);

  let onCloseMovie = () => {
    setTempSelectedId(0);
  };

  // =========================Toasify Message
  useEffect(() =>
  {
    tosifyMessage && toast.success(tosifyMessage);
    tosifyMessage && setTosifyMessage("");
  },[tosifyMessage])
  return (
    <div className="AllMovieListContainer watchedMovieContainer">
      {loading || singleMovie === undefined ? (
        <LoadingStatement />
      ) : errorMsg.status ? (
        <ErrorMessage Error={errorMsg.msg} />
      ) : (
        <div>
          {tempSelectedID ? (
            <SelectedMovieDisplay
              movieDetails={singleMovie}
              onCloseMovie={onCloseMovie}
              setRating={setRating}
              addToListHandler={addToListHandler}
            />
          ) : (
            <div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn text-light ShowHideBtn"
                  onClick={() => setWatchedMovieFullBoxDataOpen((ps) => !ps)}
                >
                  {isWatchedMovieFullBoxDataOpen ? '-' : '+'}
                </button>
              </div>

                    {/* =============List of all Movies */}
              <div>
                <div
                  className={`${isWatchedMovieFullBoxDataOpen ? '' : 'd-none'}`}
                >
                  <WatedMoviesSummary tempWatchedData={watchMovieList} />

                  {/* Creating the single watahed Movie */}
                  <div className="mt-3 watchlist">
                    {watchMovieList.map((element, index) => (
                      <WatchSumrySinEle
                        id={element.id}
                        title={element.title}
                        poster={element.poster}
                        runtime={'⏲' + element.runTime}
                        imdbRating={'⭐' + element.imdbRating}
                        userRating={'🌟' + element.userRating}
                        removeMovieHandler={removeMovieHandler}
                        addToListHandler={addToListHandler}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WatchedMovies;
