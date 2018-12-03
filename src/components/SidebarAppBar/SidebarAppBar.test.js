import React from 'react';
import { shallow } from 'enzyme';
import SidebarAppBar from './SidebarAppBar';

describe('SidebarAppBar', () => {
  it('should render correctly', () => {
    const component = shallow(<SidebarAppBar />);
    expect(component).toMatchSnapshot();
  });
});
