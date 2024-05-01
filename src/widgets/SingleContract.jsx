import { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { BACKEND_URL } from '../constants.js'
import { TabTitle } from '../shared/TabTitle.jsx'
import { AppContext } from '../App.jsx'

export const SingleContract = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const [value, setValue] = useState(null)

  const { user } = useContext(AppContext)

  const fetchContract = useCallback(async () => {
    setIsLoading(true)
    const response = await fetch(`${BACKEND_URL}/contracts/${props.contractId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "profile_id": user.id
      }
    })
    const data = await response.json()

    setValue(data)

    setIsLoading(false)
  }, [props.contractId, user.id])

  useEffect(() => {
    fetchContract()
    // Should only run once
  }, [])


  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TabTitle value={`Contract # ${props.contractId}`}/>

      <div className='flex flex-column align-center' style={{ padding: '0px 64px' }}>

        {value && (
          <div className='flex flex-column align-start'>
            <p><strong>Terms:</strong> {value.terms}</p>
            <p><strong>Status:</strong> {value.status}</p>
            <p><strong>Owner ID:</strong> {value.ClientId}</p>
            <p><strong>Contractor ID:</strong> {value.ContractorId}</p>
          </div>
        )}

        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  )
}

SingleContract.propTypes = {
  contractId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
}