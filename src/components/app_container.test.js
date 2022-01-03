import React from 'react';
import AppContainer from './app_container';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('App test', () => {
  test('shallow wrapper instance should be null', () => {
    const wrapper = Enzyme.mount(<AppContainer />);
    const instance = wrapper.instance();
    expect(instance).toEqual(null);
  }); //expected result in the functional, as opposed to the class component
});
