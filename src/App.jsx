import { createContext } from 'react'

import { LoginPage } from './Pages/Login'
import { useStore } from './useStore'

import { DashboardPage } from './Pages/Dashboard'
import './App.css'

export const AppContext = createContext(null)

export const StoreActionsContext = createContext(null)

function App() {
  const { state, action } = useStore()

  const isAuthorized = state.user !== null

  if(!isAuthorized) {
    return <LoginPage onSuccessLogin={action.login} />
  }

  return (
    <AppContext.Provider value={state}>
      <StoreActionsContext.Provider value={action}>
        <DashboardPage />
      </StoreActionsContext.Provider>
    </AppContext.Provider>
  )
}

export default App
