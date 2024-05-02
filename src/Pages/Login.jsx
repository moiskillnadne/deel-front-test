import { useState } from 'react'
import PropTypes from 'prop-types'

import { BACKEND_URL } from '../constants.js'

export const LoginPage = (props) => {
  const [value, setValue] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const submitLogin = async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`${BACKEND_URL}/profile/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId: Number(value) })
      })
  
      const json = await result.json()

      if(!json.isSuccess) {
        setError(json.message)
        throw new Error(json.message)
      }

      props.onSuccessLogin(json.profile)

      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }

  return (
    <div>
      <h1>The True Deel</h1>

      <p>Let&apos;s get started!</p>

      <div className='flex flex-column gap-8'>
        <input type="text" placeholder='Type the user id (From 0 to 9)' value={value} onChange={onChange}/>
        <button type="button" onClick={submitLogin} disabled={isLoading}>
          { isLoading ? 'Loading...' : 'Login' }
        </button>
      </div>
        
      <div style={{ minHeight: '50px' }}>
      { error && <p>{error}</p> }
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  onSuccessLogin: PropTypes.func.isRequired,
};