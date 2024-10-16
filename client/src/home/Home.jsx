import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; 




const Home = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [projects, setProjects] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [error, setError] = useState(null); 

  const modalVideoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
 


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

  const handleVideoClick = (video) => {
    console.log('Video clicked:', video);  // 添加日志
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
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
    <div className='page-background home-background'>
      
        <br />
        <br />

      <h3 className="section-title">PROJECTS</h3>

      <div className='project-main' ref={projectsRef} id="projects">
      
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        
        <div className='video-grid'>
        {videos.map((video, index) => (
          <div
            key={video.src}
            className={`project-container clickable-video video-item-${index + 1}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleVideoClick (video)}
          >
            <video
              ref={videoRefs[index]}
              className='project-video'
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

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />


        <h3 className="section-title">ABOUT</h3>

      <div className='about-section' ref={aboutRef} id="about">
      
        <div className="about-content">
          
        <p className="text">I am a new software engineer born in Shanghai and have lived across China, Germany, and Australia. My background is in interior architecture, where I developed a deep appreciation for creating and decorating spaces. Now I bring that passion into the web space, recognizing that the online environments we interact with daily are just as important as our physical ones.</p>
        <p className="text">Before transitioning to software engineering, I worked as a client advisor, where I honed my skills in active listening, problem-solving, and communicating with people from diverse backgrounds. I'm eager to enter the digital field, learning and applying technologies to shape intuitive, engaging, and practical web spaces. When I was doing the projects, I knew I learned more skills than before, intead of folowing the pattern I was trying to explore different frameworks and other ways of doing things. With my creative and technical skills, I'm excited to contribute to creating innovative solutions that enhance people's online experiences.</p>
        <p className="text">For more about my experience and skills, please check my <Link to="/cv">CV.</Link></p>
        </div>
      </div>
      <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>

      {/* modal */}

      {selectedVideo && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <video
              ref={modalVideoRef}
              className='modal-video'
              autoPlay
              muted
              controls
              loop
            >
              <source src={selectedVideo.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;