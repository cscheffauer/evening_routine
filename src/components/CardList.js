import React, { Fragment } from 'react';
import Card from './Card';
import LoadingSpinner from './Layout/LoadingSpinner/LoadingSpinner'

import './CardList.css';

const CardList = ({ people, morePeoplePending }) => {          //using people array as props
    /*
    if (true) {
        throw new Error('noooo!');          this would throw an error to test the error boundry written in ErrorBoundry.js
    }*/
    return (
        <Fragment>  {/* this fragment is to wrap all returned cards, but will avoid a additional wrap div */}
            {   //wrap in curly brackets cause it's javascript
                people.map((person, i) => {           //for each user in people array
                    return (                        //return of the map function 
                        <Card
                            key={i}
                            id={i}
                            name={person.name}
                            height={person.height}
                            mass={person.mass}
                            birth_year={person.birth_year}
                            species={person.species}
                        />);
                })
            }
            {
                morePeoplePending &&
                <LoadingSpinner swapiLabel={true} />
            }
        </Fragment>
    );
}

export default CardList;