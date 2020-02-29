import React from 'react';

import './SearchBox.css';

const SearchBox = ({ searchChange }) => {
    return (
        <div className="pa1">
            <input
                aria-label='Search Characters'
                className="pa3 searchBox"
                type='search'
                placeholder='Search characters'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;