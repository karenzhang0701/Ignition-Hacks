import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/news.png";

function Home() {
  // Function to handle the button click and make a request to the Express server
  const handleRequest = async () => {
    try {
      // Replace with your actual server URL
      const response = await fetch(
        "https://chrome-lane-432805-n2.ue.r.appspot.com/api/hello"
      ); // Update this URL
      const data = await response.json();
      console.log(data); // Handle the response data
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  };

  return (
    <div>
      <div className="bg-gradient flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            className="mb-4 w-56 h-auto animate-scale-up-down"
            alt="Logo"
          />
          <h1 className="text-4xl font-poppins text-white font-bold">
            [Title]
          </h1>
          <Link to="/main-page">
            <button
              className="button"
              style={{ marginTop: "30px" }}
              onClick={handleRequest}
            >
              Analyze Article
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
