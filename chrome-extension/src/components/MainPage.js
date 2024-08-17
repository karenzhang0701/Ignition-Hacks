import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const handleClick = () => {
    window.open('https://ignition-hacks-jjqg.vercel.app/#/summary', '_blank');
  }

  return (
    <div className="bg-gradient flex flex-col items-center justify-center h-screen">
      <h1
        className="text-4xl font-poppins text-white font-bold"
        style={{ marginTop: "10px" }}
      >
        [Title]
      </h1>
      
      <button className="button" style={{ marginTop: '30px' }} onClick={handleClick}>
        View Summary
      </button>
      
    </div>
  );
}

export default MainPage;
