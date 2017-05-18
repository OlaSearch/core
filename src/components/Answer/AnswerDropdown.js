import React from 'react'
import classNames from 'classnames'
import listensToClickOutside from 'react-onclickoutside'

class AnswerDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };
  handleClickOutside = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      })
    }
  };
  onChange = (option, index) => {
    this.props.onChange(option, index, this.props.item)
    this.handleClickOutside()
  };
  render () {
    let { active, options } = this.props
    let { isOpen } = this.state
    if (!options) return null
    let label = options[this.props.active].name
    if (options.length < 2) return <div className='ola-answer-label'>{label}</div>
    let klass = classNames('ola-answer-dropdown', {
      'ola-answer-dropdown-active': isOpen
    })
    return (
      <div className={klass}>
        <div className='ola-answer-dropdown-label' onClick={this.toggle}>{label}</div>
        {isOpen
          ? <div className='ola-answer-dropdown-box'>
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
          : null
        }
      </div>
    )
  }
}

/**
 * Dropdown Item
 */
const AnswerDropdownItem = (props) => {
  function handleClick () {
    props.onChange(props.option, props.index)
  }
  let { option: { name, exists }, isActive } = props
  if (isActive) return null
  if (exists) return <a className='ola-answer-dropdown-item' onClick={handleClick}>{name}</a>
  return (
    <span
      className='ola-answer-dropdown-item ola-answer-dropdown-item-inactive'
      >
      {name}
    </span>
  )
}

module.exports = listensToClickOutside(AnswerDropdown)
