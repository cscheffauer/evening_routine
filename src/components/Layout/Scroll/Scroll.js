import React from 'react';

import './Scroll.scss';
/*
Scroll is a wrapping component
*/
const Scroll = (props) => {
    return (
        <div className="scrollContainer">
            {props.children}        {/* scroll will use it's children to render here*/}
        </div>
    );
};

export default Scroll;