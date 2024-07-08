function WatedMoviesSummary({ tempWatchedData }) {
  let imdbRating = 0;
  let runtime = 0;
  let userRating = 0;

  if (tempWatchedData.length > 0) {
    for (let i = 0; i < tempWatchedData.length; i++) {
      imdbRating = imdbRating + Number(tempWatchedData[i].imdbRating);
    }
    imdbRating = (imdbRating / tempWatchedData.length).toFixed(2);

    for (let i = 0; i < tempWatchedData.length; i++) {
      userRating = userRating + Number(tempWatchedData[i].userRating);
    }
    userRating = (userRating / tempWatchedData.length).toFixed(2);

    for (let i = 0; i < tempWatchedData.length; i++) {
      if (Number(tempWatchedData[i].runTime.split(' ')[0]) > 0)
        runtime = runtime + Number(tempWatchedData[i].runTime.split(' ')[0]);
    }

    runtime = (runtime / tempWatchedData.length).toFixed(0);
  }

  return (
    <div>
      <div className="watchedListSummary m-0">
        <p className="text-center fw-bold">MOVIES YOU WATCHED</p>

        <div className="d-flex justify-content-around">
          <p>🎞{tempWatchedData.length} movies</p>
          <p>
            <span>⭐</span>
            {imdbRating ? imdbRating : 0}
          </p>
          <p>
            <span>🌟</span>
            {userRating ? userRating : 0}
          </p>
          <p>
            <span>⌚</span>
            {runtime ? runtime : 0} mint
          </p>
        </div>
      </div>
    </div>
  );
}

export default WatedMoviesSummary;
