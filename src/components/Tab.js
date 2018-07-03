import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import SelectBox from './SelectBox'

/**
 * Tab component
 */
class Tab extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: props.activeTab
    }
  }
  setActiveTab = (value) => {
    this.setState({
      activeTab: value
    })
  }
  handleChange = (event) => {
    this.setActiveTab(event.target.value)
  }
  static defaultProps = {
    activeTab: 0
  }
  render () {
    const { children, labels, isPhone } = this.props
    const { activeTab } = this.state
    const content = isPhone ? (
      /* Render select box if it's a phone */
      <SelectBox onChange={this.handleChange} value={activeTab}>
        {labels.map((label, i) => (
          <option key={i} value={i}>
            {label}
          </option>
        ))}
      </SelectBox>
    ) : (
      /* Render tabs if it's not a phone */
      <nav className='ola-tabs-nav'>
        {labels.map((label, i) => (
          <TabLabel
            label={label}
            index={i}
            key={i}
            onClick={this.setActiveTab}
            isActive={activeTab === i}
          />
        ))}
      </nav>
    )

    return (
      <div className='ola-tabs'>
        {content}
        {children[activeTab] || null}
      </div>
    )
  }
}

Tab.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.number
}

/**
 * Tab Label
 */
function TabLabel ({ label, index, isActive, onClick }) {
  function handleClick () {
    onClick(index)
  }
  const classes = cx('ola-tabs-label', {
    'ola-tabs-label-active': isActive
  })

  return (
    <button className={classes} onClick={handleClick}>
      {label}
    </button>
  )
}

function mapStateToProps (state) {
  return {
    isPhone: state.Device.isPhone
  }
}

export default connect(mapStateToProps)(Tab)
