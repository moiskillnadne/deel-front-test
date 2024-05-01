import { useContext, useState } from 'react'

import { AppContext, StoreActionsContext } from '../App.jsx'
import { WidgetPicker } from '../widgets/WidgetPicker.jsx'

import { Tabs } from '../constants.js'
import { TabSwitcher } from '../widgets/TabSwitcher.jsx'

export const DashboardPage = () => {
  const context = useContext(AppContext)
  const action = useContext(StoreActionsContext)

  const [currentTab, setCurrentTab] = useState(Tabs.ACCOUNT)

  const isClient = context.user.type === 'client'

  return (
    <div className="full-width full-height">
      <div className="flex justify-between align-center padding-8">
        <div>
          <h1>
            The True Deel {isClient ? <span className='client-label'>For Clients</span> : <span className='contractors-label'>For Contractors</span>}
            </h1>
        </div>
        <div>
        <button type="button" onClick={action.logout}>
          Logout
        </button>
        </div>
      </div>

      <div className='flex' style={{ marginTop: '48px', borderTop: '1px solid rgba(0,0,0, 0.3)' }}>
        <div className='flex flex-column' style={{ flex: '1', borderRight: '1px solid rgba(0,0,0, 0.3)' }}>
          <TabSwitcher type={currentTab} onSwitch={setCurrentTab}/>
        </div>
        <div style={{ flex: '3' }}>
          <WidgetPicker type={currentTab}/>
        </div>
      </div>
    </div>
  )
}