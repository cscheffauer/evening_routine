import React from 'react';
/*
Scroll is a wrapping component
*/

import './Scroll.css';

const Scroll = (props) => {
    return (
        <div className="scrollContainer" style={{  }}>
            {props.children}        {/* scroll will use it's children to render here*/}
        </div>
    );
};

export default Scroll;