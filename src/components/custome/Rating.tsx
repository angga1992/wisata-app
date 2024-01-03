// components/StarRating.tsx
import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const handleStarClick = (selectedRating: number) => {
    // You can perform any actions on star click if needed
    console.log(`Selected Rating: ${selectedRating}`);
  };

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <span
            key={index}
            className={`cursor-pointer ${
              isFilled ? 'text-yellow-600' : 'text-gray-300'
            }`}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
