import React from 'react'
import { shallow } from 'enzyme'

import withConfiguredForTesting from 'hoc/withConfiguredForTesting'

import App from './App'

const TestingComponent = withConfiguredForTesting(App)

const wrapper = shallow(<TestingComponent />)

afterAll(() => wrapper.unmount())

it('renders without crashing', () => {
  expect(wrapper.exists()).toBeTruthy()
})
