import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Layout.css';  // 我们将为 Layout 创建一个新的 CSS 文件

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToProjects = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='layout'>
      <nav className='nav'>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/about">About/CV</Link>
        </button>
        <button onClick={scrollToProjects}>FEATURED PROJECTS</button>
        <button>
          <a href="mailto:your.email@example.com">MAIL</a>
        </button>
        <button>
          <a href="https://www.linkedin.com/in/yiyun-sens-735993184/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </button>
      </nav>

      <div className='page-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;