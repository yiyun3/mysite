import React from "react";
import { Link } from "react-router-dom";

export default function About(){
    return (
        <div>
        <p>I am a new software engineer born in Shanghai and have lived across Shanghai, Germany, and Australia. My background is in interior architecture, where I developed a deep appreciation for creating and decorating spaces. Now I bring that passion into the web space, recognizing that the online environments we interact with daily are just as important as our physical ones.</p>
        <p>Before transitioning to software engineering, I worked as a client advisor, where I honed my skills in active listening, problem-solving, and communicating with people from diverse backgrounds. I'm eager to enter the digital field, learning and applying technology to shape intuitive, engaging, and practical web spaces. With my creative and technical skills, I'm excited to contribute to creating innovative solutions that enhance people's online experiences.</p>

    
            <p>For more about my experience and skills, please check my <Link to="/cv">CV</Link></p>
      
        </div>
        
    )
}