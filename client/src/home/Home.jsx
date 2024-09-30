import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Home.css'; 



const Home = () => {
  const projectsRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [projects, setProjects] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToProjects = () => {
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const fetchProjects = useCallback(async () => {
    try {
      console.log('Fetching projects...');
      const response = await axios.get('http://localhost:5005/api/projects');
      console.log('Full response:', response);

      if (response.data && Array.isArray(response.data.data)) {
        const projectsData = response.data.data;
        console.log('Projects data to be set:', projectsData);
        setProjects(projectsData);
      } else {
        console.error('Unexpected data structure:', response.data);
        setError('Received unexpected data structure from server');
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error.response || error);
      setError(error.message);
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    // 视频自动播放逻辑
    videoRefs.forEach(ref => {
      if (ref.current) {
        ref.current.play().catch(error => {
          console.log("Autoplay was prevented:", error);
        });
      }
    });
  }, [fetchProjects]);

  // 用于调试的 useEffect
  useEffect(() => {
    console.log('Projects state updated:', projects);
  }, [projects]);

  const handleMouseEnter = (index) => {
    setHoveredVideo(index);
    if (videoRefs[index].current) {
      videoRefs[index].current.pause();
    }
  };

  const handleMouseLeave = () => {
    const index = hoveredVideo;
    setHoveredVideo(null);
    if (index !== null && videoRefs[index].current) {
      videoRefs[index].current.play();
    }
  };

  const videos = [
    { src: "/videos/ecommerce.mp4", title: "E-commerce", projectTitle: "NFT Fashion E-Commerce Platform" },
    { src: "/videos/extention.mp4", title: "Extension", projectTitle: "Feature Extension" },
    { src: "/videos/mvpversion2.mp4", title: "MVP Version 2", projectTitle: "Interactive Map" }
  ];
  const getProjectInfo = (projectTitle) => {
    return projects.find(project => project.title === projectTitle);
  };





  return (
    <div className='content'>
      <nav className='nav'>
        <button>
            <Link to="/">Home</Link>
        </button>
        <button>
            <Link to={`/about`}>Abou/CV</Link>
        </button>
        <button onClick={scrollToProjects}>FEATURED PROJECTS</button>
        <button>MAIL</button>
        <button>
           <a href="https://www.linkedin.com/in/yiyun-sens-735993184/" target="_blank" rel="noopener noreferrer">LINKEDIN</a></button>
      </nav>

    <div className='page-content'>
      {location.pathname === '/' ? (
        <div>
      <div ref={projectsRef} id="projects">
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {videos.map((video, index) => (
          <div
            key={video.src}
            className='project-container'
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRefs[index]}
              className='project-video'
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video.src} type="video/mp4" />
            </video>
            {hoveredVideo === index && (
              <div className='project-info'>
                {projects && projects.length > 0 ? (
                  (() => {
                    // This is where we call getProjectInfo
                    const projectInfo = getProjectInfo(video.projectTitle);
                    return projectInfo ? (
                        <>
                          <p className='project-title'>{projectInfo.title}</p>
                          <p>{projectInfo.about}</p>
                        </>
                      ) : (
                        <p>No project information available for {video.title}.</p>
                      );
                    })()
                  ) : (
                    <p>No projects data available.</p>
                  )}
                </div>
                
            )}
          </div>
        ))}
      </div>
    </div>
     ) : (
        <Outlet />
      )}
    </div>
    </div>
  );
};

export default Home;