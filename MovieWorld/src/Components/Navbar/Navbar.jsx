import React, { useEffect, useRef, useState } from 'react';
function Navbar({ UserInputHandler, movieTitle, tempMovieData }) {
  let movieTitleTemp = '';
  const input = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (e.code === 'Enter') {
        if (document.activeElement === input.current) return;
        input.current.focus();
        UserInputHandler('');
      }
    }

    document.addEventListener('keydown', callback);
    return function () {
      document.addEventListener('keydown', callback);
    };
  });

  const gatherMovieInput = (event) => {
    movieTitleTemp = event.target.value;
    UserInputHandler(movieTitleTemp);
  };
  return (

    <div className="navbar-container flex justify-content-center">
      <div className="navbarShowCase  text-light border border-0 rounded px-3 ">
        <h1>🐰Movie World</h1>

        <input
          type="text"
          className="text-light"
          placeholder="Search movies..."
          onChange={gatherMovieInput}
          value={movieTitle}
          ref={input} //that who is referencing towars it
        />

        <h5 className='mt-2'>Find Top {tempMovieData.length ? tempMovieData.length:0} Results</h5>
      </div>
    </div>
  );
}

export default Navbar;
