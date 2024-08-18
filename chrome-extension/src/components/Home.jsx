import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../assets/news.png";

function Home() {
  const [summaryString, setSummaryString] = useState("");
  const [textString, setTextString] = useState("");
  const navigate = useNavigate();

  // Function to handle the button click and make a request to the Express server
  const handleRequest = async () => {
    try {
      const url = await getCurrentTabUrl();
      console.log("Current Tab URL:", url);

      const response = await fetch("http://localhost:3000/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();
      console.log(data); // Handle the response data

      const summaryString = data.output.summary; //Summary stored here
      console.log("Summary:", summaryString);

      const textString = data.output.text; //Full text stored here
      console.log("Text:", textString);

      setTextString(textString);
      setSummaryString(summaryString); //Summary stored here
      navigate("/summary", {state: {summary: summaryString}});

      const pbo = JSON.parse(data.output.biasReport).slice(7,-3); //Bias report stored as a JSON object here
      console.log("Bias Report:", pbo);
      const pboArr = JSON.parse(pbo)

      const topic1 = pboArr[0];
      console.log(topic1.name)
      const topic2 = pboArr[1];
      const topic3 = pboArr[2];
      const topic4 = pboArr[3];

      // Navigate to the ArticleSummary page and pass the data
      /*navigate("/summary", {
        state: {
          summary: summaryString,
          topic1: topic1,
          topic2: topic2,
          topic3: topic3,
          topic4: topic4
        }
      });*/
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  };

  async function getCurrentTabUrl() {
    return new Promise((resolve, reject) => {
      let queryOptions = { active: true, lastFocusedWindow: true };
      chrome.tabs.query(queryOptions, (tabs) => {
        let tab = tabs[0];
        if (tab) {
          resolve(tab.url);
        } else {
          reject("No active tab found");
        }
      });
    });
  }



  return (
    <div>
      <div className="bg-gradient flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            className="mb-4 w-96 h-auto animate-grow-shrink"
            alt="Logo"
          />
          <h1 className="text-6xl font-poppins text-white font-bold" style={{marginTop:'20px'}}>
            NewSight
          </h1>
          <Link to="/summary">
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