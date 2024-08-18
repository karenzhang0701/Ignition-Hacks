import React from 'react';

const getPosNegColor = (score) => {
    if (score <= 3) return 'red';
    if (score <= 7) return 'yellow';
    return 'green';
}

const getImpartialityColor = (score) => {
    if (score <= 3) return 'green';
    if (score <= 7) return 'yellow';
    return 'red';
}

const Slider = ({ title, value, description }) => {
    const colorFunction = title === 'Impartiality Score' ? getImpartialityColor : getPosNegColor

    const Labels = title === 'Impartiality Score' ? (
        <div className="side-by-side">
            <p style={{ marginRight: '150px', marginTop: '20px', marginBottom: '20px' }}>1 (partial)</p>
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>10 (impartial)</p>
        </div>
    ) : (
        <div className="side-by-side">
            <p style={{ marginRight: '150px', marginTop: '20px', marginBottom: '20px' }}>1 (negative)</p>
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>10 (positive)</p>
        </div>
    );

    return (
        <div className>
            <h1 className="title">{title}: {value}</h1>

            <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={value}
                className="slider"
                style={{ '--thumb-color': colorFunction(value) }}
                disabled
            />

            {Labels}
            <p className="description">{description}</p>
        </div>


    )
}

export default Slider;