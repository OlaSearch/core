import React from 'react'
import ArrowRight from '@olasearch/icons/lib/arrow-right'
import ChevronLeft from '@olasearch/icons/lib/chevron-left'
import ChevronRight from '@olasearch/icons/lib/chevron-right'
import { smoothScroll, debounce, isFocusable } from './../utilities'
import cx from 'classnames'

const LEFT_KEY = 37
const RIGHT_KEY = 39

export default class Swipeable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: props.startIndex,
      canScrollLeft: false,
      canScrollRight: true
    }
    this._updateScrollState = debounce(this.updateScrollState, 100)
  }
  registerRef = (el) => {
    this.scroller = el
  }
  registerRowRef = (el) => {
    this.scrollRow = el
  }
  componentWillUnmount () {
    this.scroller &&
      this.scroller.removeEventListener('scroll', this._updateScrollState)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.children !== this.props.children) {
      this._updateScrollState()
    }
  }
  componentDidMount () {
    if (this.props.showNavigation) {
      /* Add keydown */
      this.scroller.addEventListener('scroll', this._updateScrollState)
      /* immediately update scroll state */
      this.updateScrollState()
      /* Add focus */
      /**
       * Only add focus if user is not focused on any input
       */
      // if (!isFocusable(this.props.document.activeElement)) this.scroller.focus()
      if (this.props.autoFocus) this.scroller.focus()
    }
    const { active } = this.state
    if (active) {
      this.setState(
        {
          active
        },
        () => {
          /* Immediately jump to the selected slide */
          this.scrollTo(0)
        }
      )
    }
  }
  static defaultProps = {
    isCollapsed: true,
    itemWidth: 260,
    showNavigation: true,
    max: undefined,
    startIndex: null,
    autoFocus: false,
    document
  }
  scrollTo = (duration) => {
    const { active } = this.state
    if (!this.scrollRow.children[active]) return
    const width = this.scrollRow.children[active].clientWidth
    smoothScroll(this.scroller, active * width, duration).then(
      this.updateScrollState
    )
  }
  updateScrollState = () => {
    if (!this.props.showNavigation || !this.scroller) return
    // console.log(this.scroller.scrollLeft, this.scroller.clientWidth, this.scroller.scrollWidth)
    /* Check if it can scroll left */
    this.setState({
      canScrollLeft: this.scroller.scrollLeft > 0,
      canScrollRight:
        this.scroller.scrollLeft + this.scroller.clientWidth <
        this.scroller.scrollWidth
    })
  }
  handlePrev = () => {
    if (!this.state.canScrollLeft) return
    this.setState(
      {
        active: Math.max(0, this.state.active - 1)
      },
      this.scrollTo
    )
  }
  handleNext = () => {
    if (!this.state.canScrollRight) return
    this.setState(
      {
        active: Math.min(this.props.children.length - 1, this.state.active + 1)
      },
      this.scrollTo
    )
  }
  handleToggle = () => {
    this.setState(
      {
        active: this.props.max
      },
      this.updateScrollState
    )
    this.props.toggle()
  }
  handleKeyDown = (event) => {
    if (event.keyCode === RIGHT_KEY) {
      this.handleNext()
      event.preventDefault()
    }
    if (event.keyCode === LEFT_KEY) {
      this.handlePrev()
      event.preventDefault()
    }
  }
  render () {
    const {
      children,
      itemWidth,
      isCollapsed,
      max,
      size,
      toggle,
      showNavigation,
      className
    } = this.props
    const { canScrollLeft, canScrollRight } = this.state
    const showMoreButton = size > max && !isCollapsed
    const classes = cx('ola-swipeable', className)
    return (
      <div className={classes}>
        {showNavigation ? (
          <button
            className='ola-swipeable-prev'
            type='button'
            disabled={!canScrollLeft}
            onClick={this.handlePrev}
          >
            <ChevronLeft />
          </button>
        ) : null}
        <div
          className='ola-swipeable-flow'
          tabIndex='-1'
          onKeyDown={this.handleKeyDown}
          ref={this.registerRef}
        >
          <div className='ola-swipeable-row' ref={this.registerRowRef}>
            {children
              .filter((child) => child)
              .slice(0, isCollapsed ? undefined : max)
              .map((child, idx) => {
                const childClass = `ola-swipeable-item${
                  child.props.isShowMore ? ' ola-swipeable-show' : ''
                }`
                return (
                  <div className={childClass} key={idx}>
                    <div
                      className='ola-swipeable-item-inner'
                      style={{ width: itemWidth }}
                    >
                      {child}
                    </div>
                  </div>
                )
              })}
            {showMoreButton ? (
              <div className='ola-swipeable-item ola-swipeable-show'>
                <button
                  className='ola-swipeable-button'
                  onClick={this.handleToggle}
                >
                  <ArrowRight size={20} />
                  <span className='ola-swipeable-button-text'>Show all</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {showNavigation ? (
          <button
            className='ola-swipeable-next'
            type='button'
            disabled={!canScrollRight}
            onClick={this.handleNext}
          >
            <ChevronRight />
          </button>
        ) : null}
      </div>
    )
  }
}
