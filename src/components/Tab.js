import React from 'react'
import cx from 'classnames'

class Tab extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: [0]
    }
  }
  setActiveTab = (value) => {
    this.setState({
      activeTab:
        this.props.toggle && !this.props.showOne
          ? this.state.activeTab.indexOf(value) !== -1
            ? this.state.activeTab.filter((id) => id !== value)
            : [...this.state.activeTab, value]
          : [value]
    })
  }
  handleClick = (tab) => {
    this.setActiveTab(tab, toggle, showOne)
  }
  static defaultProps = {
    toggle: false,
    showOne: false
  }
  render () {
    const { toggle } = this.props
    const labels = this.props.children.map((child) => child.props.title)
    return (
      <div className='ola-tabs'>
        {toggle ? null : (
          <nav className='ola-tabs-nav'>
            {labels.map((label, index) => {
              const isActive = activeTab[0] === index
              return (
                <TabLabel
                  label={labels}
                  index={index}
                  key={index}
                  onClick={handleClick}
                  isActive={isActive}
                />
              )
            })}
          </nav>
        )}
        <div className='ola-tabs-content'>
          {children.map((child, index) => {
            const isActive = toggle
              ? activeTab.indexOf(index) !== -1
              : index === activeTab[0]
            return (
              <div>
                {toggle ? (
                  <TabLabel
                    label={labels[index]}
                    index={index}
                    onClick={handleClick}
                    isActive={isActive}
                  />
                ) : null}
                {isActive ? child : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
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

export default Tab
