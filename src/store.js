export const ACTION_TYPE = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',

  SET_CONTRACTS: 'SET_CONTRACTS',
  CLEAR_CONTRACTS: 'CLEAR_CONTRACTS',

  SET_JOBS: 'SET_JOBS',
  CLEAR_JOBS: 'CLEAR_JOBS'
}

export const initialState = {
  user: null,
  contracts: [],
  jobs: []
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        user: action.payload
      }

      case ACTION_TYPE.CLEAR_USER:
        return {
          ...state,
          user: null
        }

      case ACTION_TYPE.SET_CONTRACTS:
        return {
          ...state,
          contracts: action.payload
        }

      case ACTION_TYPE.CLEAR_CONTRACTS:
        return {
          ...state,
          contracts: []
        }

      case ACTION_TYPE.SET_JOBS:
        return {
          ...state,
          jobs: action.payload
        }

      case ACTION_TYPE.CLEAR_JOBS:
        return {
          ...state,
          jobs: []
        }

    default:
      return state
  }
}