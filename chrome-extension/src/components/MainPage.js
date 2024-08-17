import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const openSummaryPage = () => {
    window.open("https://ignition-neoio9g6j-karen-zhangs-projects.vercel.app/", "_blank"); // Replace with your actual URL
  };

  return (
    <div className="bg-gradient flex flex-col items-center justify-center h-screen">
      <h1
        className="text-4xl font-poppins text-white font-bold"
        style={{ marginTop: "10px" }}
      >
        [Title]
      </h1>
      <button className="button" style={{ marginTop: '30px' }} onClick={openSummaryPage}>
        View Summary
      </button>
    </div>
  );
}

export default MainPage;
