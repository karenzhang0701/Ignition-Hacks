import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from './Slider.jsx'


const ArticleSummary = () => {
    const location = useLocation();
    const pboObj = location.state?.pboObj || {};
    const summary = location.state?.summary //access passed state
    console.log("Received Summary:", summary);

    return (
        <div className="bg-2 container">
            <h1 className="title" style={{ marginBottom: '20px' }}>
                Article Summary
            </h1>

            {/* render summary */}
            <div className="summary-container">{summary}</div>

            {/* <Slider
                title={"Hi"}
                value={9}
                explanation={"Hello"} /> */}

            {Object.values(pboObj).map((item, index) => (
                <Slider
                    key={index}
                    description={item.explanation}
                    title={item.name}
                    value={item.score}
                />
            ))}
        </div>

    )
}

export default ArticleSummary;