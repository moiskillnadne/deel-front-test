import { useContext, useEffect, useState, useCallback } from 'react'
import { BACKEND_URL } from '../constants.js'
import { TabTitle } from '../shared/TabTitle.jsx'
import { AppContext, StoreActionsContext } from '../App.jsx'

export const JobsWidget = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isPaymanyLoading, setIsPaymentLoading] = useState(false)

  const action = useContext(StoreActionsContext)
  const { user, jobs } = useContext(AppContext)

  const isClient = user.type === 'client'

  const fetchUnpaidJobs = useCallback(async (profileId) => {
    setIsLoading(true)
    const response = await fetch(`${BACKEND_URL}/jobs/unpaid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "profile_id": profileId
      }
    })
    const data = await response.json()

    action.setJobs(data)

    setIsLoading(false)
  }, [action])

  useEffect(() => {
    fetchUnpaidJobs(user.id)
    // Should only run once
  }, [])

  const payForJob = async (jobId) => {
    setIsPaymentLoading(true)
    const response = await fetch(`${BACKEND_URL}/jobs/${jobId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "profile_id": user.id
      }
    })
    const data = await response.json()

    console.log(data)

    await fetchUnpaidJobs(user.id)
    setIsPaymentLoading(false)
  }

  if(isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <TabTitle value='Your Unpaid Jobs' />

      <div className='flex flex-column align-center' style={{ padding: '0px 64px' }}>
        {
          jobs.map((el) => {
            return (
              <div key={el.id} className='flex justify-between align-center' style={{ width: '100%', padding: '8px 0px', borderBottom: '1px solid rgba(0,0,0, 0.3)' }}>
                <div>
                  <p>#{el.id}</p>
                </div>
                <div>
                  <p>{el.description}</p>
                </div>
                <div>
                  <p>{`${el.price} DeelCoins`}</p>
                </div>
                {
                  isClient && (
                    <div>
                      <button type="button" disabled={isPaymanyLoading} onClick={() => payForJob(el.id)}>{
                        isPaymanyLoading ? 'Paying...' : 'Pay'
                      }</button>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}