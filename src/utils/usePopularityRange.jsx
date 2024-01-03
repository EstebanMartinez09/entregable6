import { useState, useEffect } from "react";
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

const usePopularityRange = (popularity) => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const calculateStars = (popularity) => {
      const totalStars = 5; // Número total de estrellas a mostrar
      const maxPopularity = 100; // Máxima popularidad

      // Calcula el número de estrellas a pintar
      const filledStars = (popularity / maxPopularity) * totalStars;

      // Crea un array con estrellas pintadas y despintadas
      const stars = Array.from({ length: totalStars }, (_, index) => {
        return index < Math.floor(filledStars) ? <IconHeartFilled className="w-5 h-5" /> :<IconHeart className="w-5 h-5" />;
      });

      setRating(stars);
    };

    calculateStars(popularity);
  }, [popularity]);

  return rating;
};

export default usePopularityRange;