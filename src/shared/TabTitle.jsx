import PropTypes from 'prop-types'

export const TabTitle = (props) => {

  return <h2>{props.value}</h2>
}

TabTitle.propTypes = {
  value: PropTypes.string.isRequired
}