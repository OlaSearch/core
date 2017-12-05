import React from 'react'
import classNames from 'classnames'
import listensToClickOutside from 'react-onclickoutside'
import withToggle from './../../decorators/withToggle'

class AnswerDropdown extends React.Component {
  handleClickOutside = () => {
    this.props.toggleDisplay()
  }
  onChange = (option, index) => {
    this.props.onChange(option, index, this.props.item)
    this.handleClickOutside()
  }
  render () {
    let { active, options, isCollapsed, toggleDisplay } = this.props
    if (!options) return null
    let label = options[this.props.active].name
    if (options.length < 2) {
      return <div className='ola-answer-label'>{label}</div>
    }
    let klass = classNames('ola-answer-dropdown', {
      'ola-answer-dropdown-active': isCollapsed
    })
    return (
      <div className={klass}>
        <div className='ola-answer-dropdown-label' onClick={toggleDisplay}>
          {label}
        </div>
        {isCollapsed ? (
          <div className='ola-answer-dropdown-box'>
            {options.map((option, idx) => {
              return (
                <AnswerDropdownItem
                  onChange={this.onChange}
                  key={idx}
                  option={option}
                  isActive={active === idx}
                  index={idx}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
}

/**
 * Dropdown Item
 */
function AnswerDropdownItem (props) {
  function handleClick () {
    props.onChange(props.option, props.index)
  }
  let { option: { name, exists }, isActive } = props
  if (isActive) return null
  if (exists) {
    return (
      <a className='ola-answer-dropdown-item' onClick={handleClick}>
        {name}
      </a>
    )
  }
  return (
    <span className='ola-answer-dropdown-item ola-answer-dropdown-item-inactive'>
      {name}
    </span>
  )
}

module.exports = listensToClickOutside(withToggle(AnswerDropdown))
