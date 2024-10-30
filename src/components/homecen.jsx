import React, { useState } from 'react';

const categories = [
  { name: 'Cricket', image: 'https://crictoday.com/wp-content/uploads/2023/01/109e38ad139dd9b2066cf375ecafbd7f.webp?auto=compress&cs=tinysrgb&w=600' },
  { name: 'FootBall', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Badminton', image: 'https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Hockey', image: 'https://e0.pxfuel.com/wallpapers/263/984/desktop-wallpaper-field-hockey-ice-hockey.jpg?auto=compress&cs=tinysrgb&w=600' },
];

const CategoryCard = ({ category, onShopNowClick }) => (
  <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
      <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
      <button
        onClick={onShopNowClick}
        className="bg-white text-black py-2 px-4 rounded-full font-semibold"
      >
        Shop
      </button>
    </div>
  </div>
);

const Carousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < categories.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCategories = categories.slice(startIndex, startIndex + 4);

  return (
    <div className="relative w-full overflow-hidden p-12">
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className={`z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none ${
            startIndex === 0 ? 'invisible' : ''
          }`}
        >
          &lt; {/* Replaced with text arrow */}
        </button>
        <div className="flex-grow grid grid-cols-4 gap-4">
          {visibleCategories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              onShopNowClick={() => alert(`Navigating to ${category.name.toLowerCase()}`)} // Simple alert instead of navigation
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className={`z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none ${
            startIndex === categories.length - 4 ? 'invisible' : ''
          }`}
        >
          &gt; {/* Replaced with text arrow */}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
