import React from 'react'
import scrollIntoView from 'dom-scroll-into-view'
import ArrowRight from '@olasearch/icons/lib/arrow-right'

class Swipeable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0
    }
  }
  registerRef = (el) => {
    this.scroller = el
  }
  registerRowRef = (el) => {
    this.scrollRow = el
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
    scrollIntoView(this.scrollRow.children[this.state.active], this.scroller, {
      allowHorizontalScroll: true,
      onlyScrollIfNeeded: false,
      alignWithLeft: true,
      offsetLeft: this.props.itemWidth
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
  static defaultProps = {
    isCollapsed: true,
    itemWidth: 300
  }
  render () {
    const { children, itemWidth, isCollapsed, max, toggle } = this.props
    return (
      <div className='ola-swipeable'>
        <button
          className='ola-swipeable-prev'
          type='button'
          onClick={this.handlePrev}
        >
          Prev
        </button>
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
            {!isCollapsed ? (
              <div className='ola-swipeable-item ola-swipeable-show'>
                <button className='ola-swipeable-button' onClick={toggle}>
                  <ArrowRight size={20} />
                  <span className='ola-swipeable-button-text'>Show all</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <button
          className='ola-swipeable-next'
          type='button'
          onClick={this.handleNext}
        >
          Next
        </button>
      </div>
    )
  }
}

module.exports = Swipeable
