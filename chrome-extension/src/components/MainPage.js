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
      {/* link to new tab that contains article summary, political leaning, author background, etc. */}
      <button className="button" style={{ marginTop: "30px" }}>
        View Summary
      </button>
      {/* link to new tab that shows sentiment analysis  */}
      <button className="button" style={{ marginTop: "30px" }}>
        View Sentiment Analysis
      </button>
    </div>
  );
}

export default MainPage;
