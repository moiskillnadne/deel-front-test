import { useContext, useEffect, useState, useCallback } from 'react'
import { BACKEND_URL } from '../constants.js'
import { TabTitle } from '../shared/TabTitle.jsx'
import { AppContext, StoreActionsContext } from '../App.jsx'

import { SingleContract } from './SingleContract.jsx'

export const ContractsWidget = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [contractId, setContractId] = useState(null)

  const action = useContext(StoreActionsContext)
  const { user, contracts } = useContext(AppContext)


  const fetchContracts = useCallback(async (profileId) => {
    setIsLoading(true)
    const response = await fetch(`${BACKEND_URL}/contracts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "profile_id": profileId
      }
    })
    const data = await response.json()

    action.setContracts(data)

    setIsLoading(false)
  }, [action])

  useEffect(() => {
    fetchContracts(user.id)
    // Should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onContractOpen = (id) => {
    setContractId(id)
  }

  const onContractClose = () => {
    setContractId(null)
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(contractId) {
    return <SingleContract contractId={contractId} onClose={onContractClose}/>
  }

  return (
    <div>
      <TabTitle value='Your Contracts'/>

      <div className='flex flex-column align-center' style={{ padding: '0px 64px' }}>
        {
          contracts.map((el) => {
            return (
              <div key={el.id} className='flex justify-between align-center' style={{ width: '100%', padding: '8px 0px', borderBottom: '1px solid rgba(0,0,0, 0.3)' }}>
                <div>
                  <p>#{el.id}</p>
                </div>
                <div>
                  <p>{el.terms}</p>
                </div>
                <div>
                  <p>{el.status}</p>
                </div>
                <div>
                  <button type="button" onClick={() => onContractOpen(el.id)}>Take a look</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}