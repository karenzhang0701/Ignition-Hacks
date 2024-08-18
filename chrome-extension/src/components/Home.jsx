import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../assets/news.png";


function Home() {
  /*const pbo = {
    "Climate Change": {
      "name": "Climate Change",
      "score": 90,
      "explanation": "The author is very concerned about the impact of food production on climate change."
    },
    "Meat Consumption": {
      "name": "Meat Consumption",
      "score": 10,
      "explanation": "The author is very critical of meat consumption and believes it needs to be reduced."
    },
    "Vegan Diet": {
      "name": "Vegan Diet",
      "score": 95,
      "explanation": "The author is very positive towards vegan diets and believes they are a solution to climate change."
    },
    "Impartiality Score": {
      "name": "Impartiality Score",
      "score": 75,
      "explanation": "While the author presents both sides of the argument, their strong support for vegan diets and criticism of meat consumption makes them less impartial."
    }
  };*/


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

      const pbo = JSON.parse(data.output.biasReport).slice(7,-3); //Bias report stored as a JSON object here
      console.log("Bias Report:", pbo);
      const pboArr = JSON.parse(pbo);
      const topic1 = pboArr[0];
      const topic2 = pboArr[1];
      const topic3 = pboArr[2];
      const topic4 = pboArr[3];

      const pboObj = {
        [topic1.name]: {
          "name": topic1.name,
          "score": topic1.score,
          "explanation": topic1.explanation
        },
        [topic2.name]: {
          "name": topic2.name,
          "score": topic2.score,
          "explanation": topic2.explanation
        },
        [topic3.name]: {
          "name": topic3.name,
          "score": topic3.score,
          "explanation": topic3.explanation
        },
        [topic4.name]: {
          "name": topic4.name,
          "score": topic4.score,
          "explanation": topic4.explanation
        }
      }

      console.log(pboObj)

      console.log("Article Text: ", data.output.text); //testing
      setTextString(data.output.text);
      setSummaryString(data.output.summary); //Summary stored here
      console.log("Summary Set:", data.output.summary); // Debugging before navigating
      navigate("/summary", {state: {summary: data.output.summary, pboObj}});
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