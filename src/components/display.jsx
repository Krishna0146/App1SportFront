import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/products.css';
import AnimatedItemsGrid from './small';

const categories = [
  { name: 'Cricket', image: 'https://crictoday.com/wp-content/uploads/2023/01/109e38ad139dd9b2066cf375ecafbd7f.webp?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Football', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Badminton', image: 'https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Hockey', image: 'https://e0.pxfuel.com/wallpapers/263/984/desktop-wallpaper-field-hockey-ice-hockey.jpg?auto=compress&cs=tinysrgb&w=600' },
];

const DashBoard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <div className="text logo-text">
            <span className="name">SportMart</span>
          </div>
        </div>
        <div className="menu">
          <Link to="/profile"><span className="text nav-text">Profile</span></Link>
          <Link to="/shopping"><span className="text nav-text">Shopping</span></Link>
          <Link to="/news"><span className="text nav-text">News</span></Link>
          <Link to="/refurbished"><span className="text nav-text">Refurbished</span></Link>
          <Link to="/cart"><span className="text nav-text">Cart</span></Link>
        </div>
      </nav>

      <div className="content">
        {/* Scrolling Images Section */}
        <div className="scrolling-images">
          <img
            src="https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image 1"
            className={`scroll-image ${currentIndex === 0 ? 'active' : ''}`}
          />
          <img
            src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image 2"
            className={`scroll-image ${currentIndex === 1 ? 'active' : ''}`}
          />
        </div>

        {/* Category Cards Section */}
        <div className="category-cards">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="overlay">
                <Link to={`/shopping`} className="shop-button">Shop</Link>
              </div>
            </div>
          ))}
        </div>
        <strong>Most Trending Sports Accessories</strong>
        {/* Services Section */}
        <div className="services">
          <hr />
          <AnimatedItemsGrid/>
          <p>Services: Delivery, Pickup, Refunds</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
