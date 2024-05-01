import { useContext, useState } from 'react'
import { AppContext } from '../App.jsx'
import { BACKEND_URL } from '../constants.js'

import { TabTitle } from '../shared/TabTitle.jsx'

export const DepositWidget = () => {

  const { user } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [value, setValue] = useState(0)
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onDepositClick = async () => {
    setIsLoading(true)
    try {
      await fetch(`${BACKEND_URL}/balances/deposit/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(value) })
      })
    } catch(error) {
      console.error(error)
      setError(error.message)
    }

    setValue(0)
    setIsLoading(false)
  }

  return (
    <div>
      <TabTitle value='Deposit Your Account'/>

      <div className='flex align-center flex-column'>
        <div  className='flex flex-column gap-8'>
          <p>Deposit your account with DeelCoins</p>
          <input type='number' placeholder='Amount' value={value} onChange={onChange} />
          <button type='button' onClick={onDepositClick} disabled={isLoading}>Deposit</button>
        </div>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}