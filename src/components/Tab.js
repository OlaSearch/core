import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import SelectBox from './SelectBox'

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
    toggle: false,
    showOne: false,
    activeTab: 0
  }
  render () {
    const { children, labels, isPhone } = this.props
    const { activeTab } = this.state

    let content
    if (!isPhone) {
      /* Render tabs if it's not a phone */
      content = (
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
    } else {
      /* Render select box if it's a phone */
      content = (
        <SelectBox onChange={this.handleChange} value={activeTab}>
          {labels.map((label, i) => {
            return (
              <option key={i} value={i}>
                {label}
              </option>
            )
          })}
        </SelectBox>
      )
    }

    return (
      <div className='ola-tabs'>
        {content}
        {children[activeTab] || null}
      </div>
    )
  }
}

Tab.propTypes = {
  toggle: PropTypes.bool,
  showOne: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.number
}

/**
 * Tab Label
 */
const TabLabel = ({ label, index, isActive, onClick }) => {
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

export default connect(mapStateToProps, {})(Tab)
