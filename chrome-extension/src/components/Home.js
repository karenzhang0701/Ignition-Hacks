import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/news.png';

function Home() {
  return (
    <div>
        <div className="bg-gradient flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <img src={Logo} className="mb-4 w-56 h-auto"/>
                <h1 className="text-4xl font-poppins text-white font-bold">[Title]</h1>
                
                <Link to="/main-page">
                    <button className="button" style={{marginTop:'30px'}}>Analyze Article</button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Home;
