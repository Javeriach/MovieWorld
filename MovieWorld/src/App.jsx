import { useEffect, useRef, useState } from 'react';

import './App.css';
import { useMovies } from './Components/useMovies';
import Navbar from './Components/Navbar/Navbar';
import AllMoviesListContainer from './Components/moviesListContainer/AllMoviesListContainer';
import WatchedMovies from './Components/WatchedMovies/WatchedMovies';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  let [movieTitle, setMovieName] = useState('Famous');
  let [selectToDisplayID, setSelectedToDisplayID] = useState(0);
  let { isLoading, error, tempMovieData, setMovieData } = useMovies(movieTitle);
  const UserInputHandler = (name) => {
    setMovieName(name);
  };

  //Id of Movie to display
  let selectedMovieDisplayHandler = (id) => {
    setSelectedToDisplayID(id);
  };

  return (
    <>
         <Navbar
        UserInputHandler={UserInputHandler}
        movieTitle={movieTitle}
        tempMovieData={tempMovieData}
      />
      <div className="WholeMovieContainer mt-4">
        <>
          <AllMoviesListContainer
            tempMovieData={tempMovieData}
            movieTitle={movieTitle}
            selectedMovieDisplayHandler={selectedMovieDisplayHandler}
            error={error}
            isLoading={isLoading}
          />
          <WatchedMovies
            selectToDisplayID={selectToDisplayID}
            tempMovieData={tempMovieData}
            setSelectedToDisplayID={setSelectedToDisplayID}
          />
        </>
      </div>
    </>
  );
}

export default App;
