import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function ArticleSummary() {
    // const [sentenceCount, setSentenceCount] = useState(1);

    // const handleSliderChange = (event) => {
    //     setSentenceCount(event.target.value);
    // };

    const location = useLocation();
    const summary = location.state?.summary || "No summary available"; //access passed state
    console.log("Received Summary:", summary);

    const [biasScore, setbiasScore] = useState(10);

    const handleBiasChange = (event) => {
        setbiasScore(event.target.value);
    };

    const getColor = (score) => {
        if (score <= 3) return 'green';
        if (score <= 7) return 'yellow';
        return 'red';
    };

    return (
        <div className="bg-2 flex flex-col items-center justify-center h-screen">
{/* 
            <h1 className="text-4xl font-poppins text-black font-bold mb-4">
                Select Number of Sentences
            </h1>
            <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={sentenceCount}
                onChange={handleSliderChange}
                className="slider"
            />
            <p className="text-black mt-4" style={{ marginBottom: '50px' }}>Number of sentences: {sentenceCount}</p> */}

            <h1 className="text-4xl font-poppins font-bold mb-4" style={{ marginBottom: '80px' }}>
                Article Summary
            </h1>
            {/* render summary */}
            {summary}

            <h1 className="text-4xl font-poppins font-bold mb-4"> Biases Overview </h1>
            <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={biasScore}
                onChange={handleBiasChange}
                className="slider"
                style={{
                    '--thumb-color': getColor(biasScore)
                }}
                disabled
            />
            <div className="side-by-side">
                <p style={{marginRight:'430px', marginTop:'20px'}}>1 (unbiased)</p>
                <p style={{marginTop:'20px'}}>10 (very biased)</p>
            </div>
            <p className="font-poppins text-black mb-4" style={{fontSize:'20px'}}>Bias Score: {biasScore}</p>

        </div>
    
    )
}

export default ArticleSummary;