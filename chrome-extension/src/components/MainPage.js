import React from "react";
import { Link } from "react-router-dom";

function MainPage() {

  return (
    <div className="bg-gradient flex flex-col items-center justify-center h-screen">
      <h1
        className="text-4xl font-poppins text-white font-bold"
        style={{ marginTop: "10px" }}
      >
        [Title]
      </h1>
      <Link to="/summary">
      <button className="button" style={{ marginTop: '30px' }}>
        View Summary
      </button>
      </Link>
    </div>
  );
}

export default MainPage;
