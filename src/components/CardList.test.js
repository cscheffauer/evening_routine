import { shallow, mount, render } from 'enzyme';
import React from 'react';          //need to import react to use JSX in the shallow
import CardList from './CardList';

const peopleMock = [{
    id: 1,
    email: 'emailadress',
    name: 'hello'
}]


it('expect to render a CardList', () => {
    expect(shallow(<CardList people={peopleMock} />).length).toEqual(1);     //shallow will enable us to render a card and with expect we can test if the Card is rendered
});


it('expect to render a CardList, compared against a snapshot', () => {
    expect(render(<CardList people={peopleMock} />)).toMatchSnapshot();     //at the first time running a snapshot will be saved in the snapshots folder - delete it if you want to create a new snapshot you want to test against it
});                                                 //or press w in the terminal to show more and press u to update the failing snapshots



//if we would test a stateful component like a counterbutton
/*
it('correctly increments the counter', () => {
    const MockColor = 'red';
    const wrapper = shallow(<CounterButton color={MockColor} />);
    wrapper.find('[id="counter"]').simulate('click')            //find the button with the id counter and simulate a click on it
    expect(wrapper.state()).toEqual({ count: 1 });              //verify if the state of the wrapper will have the count: 1
    wrapper.find('[id="counter"]').simulate('click')            //find the button with the id counter and simulate a click on it
    expect(wrapper.state()).toEqual({ count: 2 });              //count should now be 2, cause we clicked twice
    expect(wrapper.props().color).toEqual({'red'});
});
*/
