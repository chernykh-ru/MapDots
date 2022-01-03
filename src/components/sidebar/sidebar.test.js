import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import Sidebar from './sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('Sidebar Click Test', () => {
  const mockCallBack = jest.fn();
  const output = Enzyme.mount(
    <Sidebar Dots={[]} addNewDot={mockCallBack} resetAllDots={mockCallBack} />,
  );

  it('dot add check', () => {
    output.find('.dot-add').simulate('click', { preventDefault: () => {} });
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(mockCallBack.mock.calls[0][0]).toBe('');
  });

  it('dots reset check', () => {
    output.find('.dots-reset').simulate('click', () => {
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });

  it('should call setValue function on input change', () => {
    const wrapper = shallow(<Sidebar />);
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: 42 } });
    input = wrapper.find('input');
    expect(input.props().value).toEqual(42);
  });
});
