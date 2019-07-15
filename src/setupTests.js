import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

jest.useFakeTimers()

configure({ adapter: new Adapter() })

// mock window
global.window = { location: { hostname: '', reload: () => 0 } }

// mock SVGElement
global.SVGElement = global.Element
