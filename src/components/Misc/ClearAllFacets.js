import React from 'react'
import { removeAllFacets, executeSearch } from './../../actions/Search'

class ClearAllFacets extends React.Component {
  handleClick = () => {
    let { dispatch } = this.props

    dispatch(removeAllFacets())
    dispatch(executeSearch())
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.selected !== this.props.selected
  }
  render () {
    let { selected } = this.props
    if (!selected.length) return null

    return (
      <button
        type='button'
        className='ola-link-clear-all-filters'
        onClick={this.handleClick}
      >Clear all filters</button>
    )
  }
}

module.exports = ClearAllFacets
