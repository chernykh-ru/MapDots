import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SidebarElement from './sidebar_element';

Enzyme.configure({ adapter: new Adapter() });

describe('SidebarElement Event Test', () => {
  const mockCallBack = jest.fn();
  const output = Enzyme.mount(
    <SidebarElement
      Dot={{ coordinates: [42, 42], name: '', id: '' }}
      deleteDot={mockCallBack}
      onDragStart={mockCallBack}
    />,
  );

  it('delete click check', () => {
    output.find('.sidebar_element_button').simulate('click', () => {
      expect(mockCallBack.mock.calls.length).toEqual(1);
      expect(mockCallBack.mock.calls[0][0]).toBe('');
    });
  });

  it('drugstart test', () => {
    output.find('.sidebar_element').simulate('dragstart', () => {
      expect(mockCallBack.mock.calls.length).toEqual(1);
      expect(mockCallBack.mock.calls[0][1]).toBe(Number);
    });
  });
});
