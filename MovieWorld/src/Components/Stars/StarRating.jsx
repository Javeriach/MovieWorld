import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SingleStarCreation from './SingleStarCreation';
import propTypes from 'prop-types';

const starDisplayBoxSetting = {
  // fontSize: '40px',
  display: 'flex',
  columnGap: '3px',
};

StarRating.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
  defaultRating: propTypes.number,
  messages: propTypes.array,
  setMovingRating: propTypes.func,
  movieRatingHandler: propTypes.func,
};

function StarRating({
  starNo = 5,
  color = '#ffcc19',
  size = '40px',
  defaultRating = 0,
  messages = [], //like good , excellent etc at specific rating
  setMovingRating,
  movieRatingHandler,
}) {
  let [maxRating, setMaxRating] = useState(defaultRating);
  let [tempRating, setTempRating] = useState(0);

  const ratingTextStyling = {
    color: `${color}`,
  };

  const singleStarStyling = {
    display: 'block',
    height: `${size}`,
    width: `${size}`,
  };

  let maxRatingHandler = (rating) => {
    movieRatingHandler(rating);
    setMaxRating(rating);
    setTempRating(0);
    setMovingRating ? setMovingRating(rating) : '';

    // {tempRating && messages.length > 0
    //   ? messages[tempRating - 1]
    //   : tempRating && messages.length === 0
    //   ? tempRating
    //   : maxRating
    //   ? maxRating
    //   : ''}
  };

  return (
    <div style={starDisplayBoxSetting}>
      {Array.from({ length: starNo }, (_, i) => (
        <SingleStarCreation
          singleStarStyling={singleStarStyling}
          maxRatingHandler={() => maxRatingHandler(i + 1)}
          key={i}
          currentValue={i + 1}
          // onCursorEnter={() => setTempRating(i + 1)}
          // onCursorLeave={() => setTempRating(0)}
          color={color}
          maxRating={maxRating}
          tempRating={tempRating}
        />
      ))}
    </div>
  );
}

export default StarRating;
