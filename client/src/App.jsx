import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./home/Home";
import Layout from './layout/layout';


function App() {
  

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Layout />} > 
        {/* 一个根路径 "/" 的路由，它也渲染 <Home /> 组件。就会帮助显示其他页面输出的内容 */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
