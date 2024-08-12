import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../auth/AuthContext';

const Navbar = ({ handleLogout, handleSearch }) => {
  const location = useLocation();
  const { auth } = useAuth(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/posts">Dtech Inc</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className={`nav-item ${location.pathname === '/posts' ? 'active' : ''}`}>
              <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            {/* Mostrar el enlace "Profile" solo si el usuario está autenticado */}
            {auth && auth.user ? (
              <>
                <li className={`nav-item ${location.pathname.startsWith('/profile') ? 'active' : ''}`}>
                  <Link className="nav-link" to={`/profile/${auth.user.id}`}>Profile</Link>
                </li>
                <li className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/create">Create Post</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
          {auth && auth.user && (
            <form className="d-flex">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                onChange={(e) => handleSearch(e.target.value)} 
              />
              <button 
                className="btn btn-outline-danger" 
                onClick={handleLogout} 
                type="button"
              >
                Logout
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
