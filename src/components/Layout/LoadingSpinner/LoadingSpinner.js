import React from 'react'

import './LoadingSpinner.css';


const LoadingSpinner = (props) => {
    const { className } = props;
    return (
        <div className={`${className} "loadingContainer"`}>
            <div className="circleLoading"></div>
        </div>
    );
}

export default LoadingSpinner;
