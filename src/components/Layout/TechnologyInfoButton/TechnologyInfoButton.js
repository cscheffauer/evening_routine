import React from 'react'

import './TechnologyInfoButton.css';
import { TECHNOLOGYINFO_ROUTE } from '../../../constants';


const TechnologyInfoButton = ({ onRouteChange }) => {
    return <div className="TechnologyInfoButtonContainer"> <img alt="Technology Info Button" className="TechnologyInfoButton" onClick={() => onRouteChange(TECHNOLOGYINFO_ROUTE)} src="images/code.png"></img></div>
}

export default TechnologyInfoButton;