import { useReducer } from 'react'
import { ACTION_TYPE, initialState, reducer } from './store'

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (user) => {
    return dispatch({
      type: ACTION_TYPE.SET_USER,
      payload: user
    })
  }

  const setContracts = (contracts) => {
    return dispatch({
      type: ACTION_TYPE.SET_CONTRACTS,
      payload: contracts
    })
  }

  const clearContracts = () => {
    return dispatch({
      type: ACTION_TYPE.CLEAR_CONTRACTS
    })
  }

  const setJobs = (jobs) => {
    return dispatch({
      type: ACTION_TYPE.SET_JOBS,
      payload: jobs
    })
  }

  const logout = () => {
    clearContracts()
    clearJobs()
    return dispatch({
      type: ACTION_TYPE.CLEAR_USER,
    })
  }

  const clearJobs = () => {
    return dispatch({
      type: ACTION_TYPE.CLEAR_JOBS
    })
  }


  return {
    state,
    action: {
      login,
      logout,
      setContracts,
      clearContracts,
      setJobs,
      clearJobs
    }
  }
}