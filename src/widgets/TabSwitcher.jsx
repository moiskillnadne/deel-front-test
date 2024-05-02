import { useContext } from 'react'
import PropTypes from 'prop-types'

import { Tabs } from '../constants'
import { AppContext } from '../App'

export const TabSwitcher = (props) => {

  const { user } = useContext(AppContext)

  const isClient = user.type === 'client'

  const contactorsOnly = [Tabs.JOBS, Tabs.CONTRACTS, Tabs.ACCOUNT, Tabs.NEWS]

  const tabs = Object.keys(Tabs).filter((el) => isClient ? true : contactorsOnly.includes(el)).map((tab) => {
    return {
      key: tab,
      value: Tabs[tab].charAt(0).toUpperCase() + Tabs[tab].slice(1).toLowerCase()
    }
  })

  return (
    <>
      {
        tabs.map((tab) => {
          return (
            <button key={tab.key} onClick={() => props.onSwitch(tab.key)}>{tab.value}</button>
          )
        })
      }
    </>
  )
}

TabSwitcher.propTypes = {
  type: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired
}