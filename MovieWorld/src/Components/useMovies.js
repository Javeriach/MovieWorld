import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export function useMovies(movieTitle) {
  let [isLoading, setLoader] = useState(false);
  let [error, setError] = useState('');
  let [tempMovieData, setMovieData] = useState([]);
  const controller = new AbortController(movieTitle);
  let key = '1f2b401b';
  useEffect(() => {
    async function fectchingData() {
      try {
        setMovieData([]);
        setLoader(true);
        setError('');

        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${movieTitle}`,
          { signal: AbortController.signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong..');
        } else {
          let data = await res.json();

          if (data.Response === 'False') {
            throw new Error('Movies Not found');
          } else setMovieData(data.Search);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoader(false);
      }
    }

    if (movieTitle.length === 0) setMovieData([]);
    if (movieTitle.length < 3) {
      setError('');
      setLoader(false);
      return;
    }
    fectchingData();

    return function () {
      controller.abort();
    };
  }, [movieTitle]);
  return { isLoading, error, tempMovieData, setMovieData };
}
