import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from './Slider.jsx'


function ArticleSummary() {
    const location = useLocation();
    const summary = location.state?.summary //access passed state
    console.log("Received Summary:", summary);

    return (
        <div className="bg-2 container">
            <h1 className="title" style={{ marginBottom: '20px' }}>
                Article Summary
            </h1>

            {/* render summary */}
            <div className="summary-container">{summary}</div>

            <Slider
                title={"Hi"}
                value={9}
                explanation={"Hello"} />
        </div>
    
    )
}

export default ArticleSummary;