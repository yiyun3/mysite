import React, { useState }  from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Layout.css';  // 我们将为 Layout 创建一个新的 CSS 文件

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveButton(`/${sectionId}`);
  };

  

  return (
    <div className='layout'>
      <nav className='nav'>
       
        {/* <button 
          className={`custom-btn ${activeButton === '/' ? 'active' : ''}`}
          onClick={() => handleButtonClick('/')}
        >
          <Link to="/">Home</Link>
        </button> */}

        <button 
          className={`custom-btn ${activeButton === '/about' ? 'active' : ''}`}
          onClick={() => scrollToSection('about')}
        >
            ABOUT/CV
        </button>

        <button 
          className={`custom-btn ${activeButton === '/projects' ? 'active' : ''}`}
          onClick={() => scrollToSection('projects')}
        >
          FEATURED PROJECTS
        </button>
        <button className="custom-btn">
          <a href="mailto:yiyunsens@outlook.com">MAIL</a>
        </button>
        <button className="custom-btn">
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