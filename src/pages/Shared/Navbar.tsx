import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import logo1 from '../../assets/logo-1.png';
import logo2 from '../../assets/logo-2.png';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Calculate the total item count
  const cartItemCount = cartItems.length;
  
  // Calculate the subtotal
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

  // Reusable NavLink component
  const CustomNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 text-base ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-gray-900'}`
      }
    >
      {children}
    </NavLink>
  );

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // localStorage.removeItem('authToken');
    
    // Navigate to the login page
    navigate('/login');
  };


  return (
    <div className="navbar bg-base-100  mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Toggle navigation" aria-haspopup="true" aria-expanded="false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-52 p-2 shadow"
            aria-label="Dropdown menu"
          >
            <li><CustomNavLink to="/">Home</CustomNavLink></li>
            <li><CustomNavLink to="/products">Products</CustomNavLink></li>
            <li><CustomNavLink to="/about">About Us</CustomNavLink></li>
            <li><CustomNavLink to="/contact">Contact Us</CustomNavLink></li>
            <li><CustomNavLink to="/dashboard">Dashboard</CustomNavLink></li>
          </ul>
        </div>
        <div className="logo-container">
          <NavLink to="/" className="logo-link flex items-center space-x-2">
            <img src={logo2} alt="Logo" className="h-12 lg:h-20 p-1" />
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><CustomNavLink to="/">Home</CustomNavLink></li>
          <li><CustomNavLink to="/products">Products</CustomNavLink></li>
          <li><CustomNavLink to="/about">About Us</CustomNavLink></li>
          <li><CustomNavLink to="/contact">Contact Us</CustomNavLink></li>
          <li><CustomNavLink to="/dashboard">Dashboard</CustomNavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-2 md:mr-4" aria-label="View cart" aria-haspopup="true" aria-expanded="false">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cartItemCount}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[2] mt-3 w-52 shadow"
            aria-label="Cart dropdown"
          >
            <div className="card-body">
              <span className="text-lg font-bold">Items: {cartItemCount}</span>
              <span className="text-black">Subtotal: ${cartSubtotal.toFixed(2)}</span>
              <div className="card-actions">
                <NavLink to="/cart" className="btn btn-block bg-blue-600 text-white">
                  View Cart
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end z-[2]">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="User menu" aria-haspopup="true" aria-expanded="false">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://randomuser.me/api/portraits/women/3.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            aria-label="User dropdown menu"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge"></span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
