import React from 'react'
import ArrowRight from '@olasearch/icons/lib/arrow-right'
import ChevronLeft from '@olasearch/icons/lib/chevron-left'
import ChevronRight from '@olasearch/icons/lib/chevron-right'
import { smoothScroll, debounce } from './../utilities'

export default class Swipeable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
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
  componentDidMount () {
    if (this.props.showNavigation) {
      this.scroller.addEventListener('scroll', this._updateScrollState)
      /* immediately update scroll state */
      this.updateScrollState()
    }
    if (this.props.startIndex !== this.state.active) {
      this.setState(
        {
          active: this.props.startIndex
        },
        this.scrollTo
      )
    } else {
      if (this.props.startIndex !== null) this.scrollTo()
    }
  }
  static defaultProps = {
    isCollapsed: true,
    itemWidth: 260,
    showNavigation: true,
    max: undefined,
    startIndex: null
  }
  handlePrev = () => {
    this.setState(
      {
        active: Math.max(0, this.state.active - 1)
      },
      this.scrollTo
    )
  }
  scrollTo = () => {
    if (!this.scrollRow.children[this.state.active]) return
    smoothScroll(
      this.scroller,
      this.state.active * this.scrollRow.children[this.state.active].clientWidth
    ).then(this.updateScrollState)
  }
  updateScrollState = () => {
    if (!this.props.showNavigation || !this.scroller) return
    /* Check if it can scroll left */
    this.setState({
      canScrollLeft: this.scroller.scrollLeft > 0,
      canScrollRight:
        this.scroller.scrollLeft + this.scroller.clientWidth <
        this.scroller.scrollWidth
    })
  }
  handleNext = () => {
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
  render () {
    const {
      children,
      itemWidth,
      isCollapsed,
      max,
      size,
      toggle,
      showNavigation
    } = this.props
    const { canScrollLeft, canScrollRight } = this.state
    const showMoreButton = size > max && !isCollapsed
    return (
      <div className='ola-swipeable'>
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
        <div className='ola-swipeable-flow' ref={this.registerRef}>
          <div className='ola-swipeable-row' ref={this.registerRowRef}>
            {children
              .slice(0, isCollapsed ? undefined : max)
              .map((child, idx) => {
                return (
                  <div className='ola-swipeable-item' key={idx}>
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
