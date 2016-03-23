import React from 'react'
import ReactList from 'react-list'
import listensToClickOutside from 'react-onclickoutside/decorator'
import classNames from 'classnames'

class Dropdown extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      isOpen: false,
      curIndex: 0,
      selectedText: props.item ? props.item.defaultValue : ''
    }
  }

  handleClickOutside = (event) => {
    var { isPhone, isTablet } = this.props.device

    if (isPhone || isTablet) return

    this.setState({
      isOpen: false
    })
  };

  componentDidMount () {
    var {index} = this.props

    if (index > 0) this.focusAndSelect()
  }

  focusAndSelect = () => {
    this.refs.Input.focus()

    this.refs.Input.select()
  };

  handleEvents = (event) => {
    var { isOpen } = this.state

    switch (event.type) {
      case 'mouseup':
        this.setState({
          isOpen: !isOpen
        })

        this.focusAndSelect()
        break

      case 'blur':
        var { isPhone, isTablet } = this.props.device
        if (isPhone || isTablet) return

        this.setState({
          isOpen: false
        })
        break

      case 'click':
      case 'focus':
        this.setState({
          isOpen: true,
          filterText: ''
        })

        break
    }
  };

  handleKeyUp = (event) => {
    var { curIndex } = this.state
    var { values } = this.props.item

    switch (event.which) {
      case 13: // ENTER
        this._values.length && this.selectItem(this._values[curIndex].name, curIndex)
        break
      case 27: // ESC
        this.setState({
          isOpen: false,
          curIndex: 0
        })
        break
      case 40: // DOWN
        this.setState({
          curIndex: Math.min(++curIndex, values.length - 1),
          isOpen: true
        })
        break
      case 38: // UP
        this.setState({
          curIndex: Math.max(--curIndex, 0),
          isOpen: true
        })
        break

      default:
        this.setState({
          filterText: event.target.value,
          curIndex: 0,
          isOpen: true
        })
        break
    }

    if (this.refs.ItemList) this.refs.ItemList.scrollTo(curIndex)
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.item.values !== this.props.item.values) {
      /* Set current index */

      var { values, defaultValue } = nextProps.item

      values = values.sort((a, b) => a.name.localeCompare(b.name))

      for (var i = 0; i < values.length; i++) {
        if (values[i].name === defaultValue) {
          this.setState({
            curIndex: i
          })
        }
      }
    }
  }

  selectItem = (value, index, event) => {
    this.props.handleChange.call(this, value)

    this.setState({
      isOpen: false,
      filterText: '',
      curIndex: index,
      selectedText: value
    })

    this.refs.Input.value = value

    setTimeout(() => {
      var { isPhone, isTablet } = this.props.device

      if (!isPhone && !isTablet) this.refs.Input.focus()
    }, 100)
  };

  render () {
    var {
      item
    } = this.props

    var {
      defaultValue,
      values
    } = item

    var {
      filterText,
      isOpen,
      curIndex,
      selectedText
    } = this.state

    values = values || []

    /**
     * Filter values
     */

    this._values = values = values
        .filter((item) => item.name.match(new RegExp(filterText, 'i')))
        .sort((a, b) => a.name.localeCompare(b.name))

    var len = values.length
    var selectedIndex = 0

    /* Find selectedIndex */

    for (var i = 0; i < len; i++) {
      if (values[i].name === selectedText) {
        selectedIndex = i
        break
      }
    }

    if (curIndex === 0 && selectedIndex) curIndex = selectedIndex

    /**
     * ClassName
     */
    var klass = classNames({
      'ola-dropdown-container': true,
      'ola-dropdown-open': isOpen
    })

    return (
      <div className={klass}>
        <input
          ref='Input'
          type='text'
          className='ola-text-input'
          placeholder='Select'
          defaultValue={defaultValue}
          onClick={this.handleEvents}
          onBlur={this.handleEvents}
          onKeyUp={this.handleKeyUp}
        />
        <div className='ola-dropdown-arrow' onMouseUp={this.handleEvents} />
        {isOpen
          ? <div className='ola-dropdown' ref='Dropdown'>
            <ReactList
              ref='ItemList'
              initialIndex={selectedIndex}
              itemRenderer={(idx, key) => {
                var name = values[idx].name
                var selectItem = this.selectItem.bind(this, name, idx)
                var klassName = classNames({
                  'ola-dropdown-item': true,
                  'ola-dropdown-item-active': selectedIndex === idx,
                  'ola-dropdown-item-hover': curIndex === idx
                })

                return (
                  <a
                    key={key}
                    className={klassName}
                    onMouseDown={selectItem}
                  >
                    {name}
                  </a>
                )
              }}
              length={len}
              type='uniform'
            />
          </div>
          : null
        }
      </div>
    )
  }
}

module.exports = listensToClickOutside(Dropdown)
