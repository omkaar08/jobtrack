import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LayoutDashboard, ListFilter, PlusCircle, LogOut, User, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Briefcase size={20} />
          </div>
          <span>JobTrack</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {isAuthenticated ? (
            <>
              <ul className="navbar-links">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    <LayoutDashboard size={17} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/applications"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    <ListFilter size={17} />
                    <span>Applications</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/applications/new"
                    className={({ isActive }) =>
                      isActive ? 'nav-link nav-btn-primary active' : 'nav-link nav-btn-primary'
                    }
                  >
                    <PlusCircle size={17} />
                    <span>Add Application</span>
                  </NavLink>
                </li>
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User size={16} />
                  </div>
                  <span>{user?.fullName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Log Out"
                  style={{ color: '#ef4444', borderColor: 'var(--border-color)' }}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <ul className="navbar-links">
              <li>
                <Link to="/login" className="nav-link">
                  <LogIn size={16} />
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link nav-btn-primary">
                  <UserPlus size={16} />
                  Get Started
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
