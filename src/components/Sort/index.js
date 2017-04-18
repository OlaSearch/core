import React from 'react'
import PropTypes from 'prop-types'
import { changeSort, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'

class Sort extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
  };

  static contextTypes = {
    config: PropTypes.object
  };

  handleChange = (event) => {
    let { dispatch } = this.props
    dispatch(changeSort(event.target.value))
    dispatch(executeSearch())
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.selected !== this.props.selected
  }
  render () {
    let { sortBy } = this.context.config
    let { selected, translate } = this.props

    return (
      <div className='ola-sort'>
        <label>{translate('sort_label')} </label>
        <select
          className='ola-sort-select'
          value={selected}
          onChange={this.handleChange}
          >
          <option value=''>Relevance</option>
          {sortBy.map((sort, idx) => <option key={idx} value={sort.value}>{sort.name}</option>)}
        </select>
      </div>
    )
  }
}

module.exports = injectTranslate(Sort)
