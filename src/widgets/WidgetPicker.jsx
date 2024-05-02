import PropTypes from 'prop-types';
import { Tabs } from '../constants.js';

import { AccountWidget } from './Account.jsx';
import { ContractsWidget } from './Contracts.jsx';
import { JobsWidget } from './Jobs.jsx';
import { DepositWidget } from './Deposit.jsx';
import { NewsWidget } from './News.jsx';

export const WidgetPicker = (props) => {
  switch(props.type) {
    case Tabs.ACCOUNT:
      return <AccountWidget />

    case Tabs.CONTRACTS:
      return <ContractsWidget />

    case Tabs.JOBS:
      return <JobsWidget />

    case Tabs.DEPOSIT:
      return <DepositWidget />

    case Tabs.NEWS:
      return <NewsWidget />

    
    default:
      return <AccountWidget />
  }
}

WidgetPicker.propTypes = {
  type: PropTypes.string.isRequired
}