import { useContext, useEffect, useState } from 'react'
import { AppContext, StoreActionsContext } from '../App.jsx'
import { BACKEND_URL } from '../constants.js'

import { TabTitle } from '../shared/TabTitle.jsx'

export const AccountWidget = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useContext(AppContext)
  const { login } = useContext(StoreActionsContext)

  const refreshUserInfo = async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`${BACKEND_URL}/profile/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId: Number(user.id) })
      })
  
      const json = await result.json()

      if(!json.isSuccess) {
        throw new Error(json.message)
      }

      login(json.profile)

      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }

  useEffect(() => {
    refreshUserInfo()
    // Should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TabTitle value='Your Account'/>

      <div className='flex flex-column align-center' style={{ padding: '0px 64px' }}>
        <div className='flex flex-column align-start'>
          <p><strong>Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
          <p><strong>Profession:</strong> {user.profession}</p>
          <p><strong>Balance (In DeelCoins):</strong> {user.balance.toFixed(2)}</p>
          <p><strong>Type:</strong> {user.type}</p>
        </div>
      </div>
    </div>
  )
}