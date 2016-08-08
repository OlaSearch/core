import React from 'react'
import { removeAllFacets, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'

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
    let { selected, translate } = this.props
    if (!selected.length) return null

    return (
      <button
        type='button'
        className='ola-link-clear-all-filters'
        onClick={this.handleClick}
      >{translate('clear_all_filters')}</button>
    )
  }
}

module.exports = injectTranslate(ClearAllFacets)
