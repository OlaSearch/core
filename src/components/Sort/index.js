import React from 'react'
import { changeSort, executeSearch } from './../../actions/Search'

class Sort extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string.isRequired
  };

  static contextTypes = {
    config: React.PropTypes.object
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
    let { selected } = this.props

    return (
      <div className='ola-sort'>
        <label>Sort by </label>
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

module.exports = Sort

