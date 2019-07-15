export const initialState = { initialzed: false }

export const INITIALIZED = 'INITIALIZED'

export default function AppInitReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INITIALIZED:
      return { ...state, initialzed: true }
    default:
      return state
  }
}
