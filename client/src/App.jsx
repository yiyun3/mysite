import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from "./home/Home";
import About from "./about/About"

function App() {
  

  return (
   <Router>
   
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* 一个根路径 "/" 的路由，它也渲染 <Home /> 组件。就会帮助显示其他页面输出的内容 */}
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
   
  </Router>
  );
}

export default App;
