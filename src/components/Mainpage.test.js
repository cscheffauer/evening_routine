import { shallow, mount, render } from 'enzyme';
import React from 'react';          //need to import react to use JSX in the shallow
import MainPage from './MainPage/MainPage';

let wrapper, wrapper2, wrapper3, wrapper4;

beforeEach(() => {
    const mockProps = {
        onRequestPeople: jest.fn(),
        people: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage {...mockProps} />);
})

it('renders the mainpage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
});

it('filters people correctly', () => {
    expect(wrapper.instance().filterPeople()).toEqual([]);          //check if filtering of a empty people array with a empty searchfield will return an empty array

    const mockProps2 = {
        onRequestPeople: jest.fn(),
        people: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'John',
        isPending: false
    }
    wrapper2 = shallow(<MainPage {...mockProps2} />);
    expect(wrapper2.instance().filterPeople()).toEqual([{                   //check if filtering the people array will return the array we searched for
        id: 3,
        name: 'John',
        email: 'john@gmail.com'
    }]);
})

it('filters people correctly 2', () => {
    const mockProps3 = {
        onRequestPeople: jest.fn(),
        people: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending: false
    }
    const filteredPeople = [];
    wrapper3 = shallow(<MainPage {...mockProps3} />);
    expect(wrapper3.instance().filterPeople()).toEqual(filteredPeople);
})

it('returns isPending correctly', () => {
    const mockProps4 = {
        onRequestPeople: jest.fn(),
        people: [],
        searchField: '',
        isPending: true
    }
    wrapper4 = render(<MainPage {...mockProps4} />);
    expect(wrapper4).toMatchSnapshot();
})