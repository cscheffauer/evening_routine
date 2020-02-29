import { shallow, mount, render } from 'enzyme';
import React from 'react';          //need to import react to use JSX in the shallow
import Card from './Card';


it('expect to render a Card component ', () => {
    expect(shallow(<Card />).length).toEqual(1);     //shallow will enable us to render a card and with expect we can test if the Card is rendered
});


it('expect to render a Card component and compare against a snapshot', () => {
    expect(render(<Card />)).toMatchSnapshot();     //at the first time running a snapshot will be saved in the snapshots folder - delete it if you want to create a new snapshot you want to test against it
});                                                 //or press w in the terminal to show more and press u to update the failing snapshots



