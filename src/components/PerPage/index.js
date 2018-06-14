import React from 'react'
import PropTypes from 'prop-types'
import { changePerPage, executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import SelectBox from './../SelectBox'

/**
 * Change how many results are displayed in one page
 */
function PerPage ({ perPage, values, translate, dispatch }) {
  function onChange (event) {
    dispatch(changePerPage(event.target.value))
    dispatch(executeSearch())
  }

  return (
    <div className='ola-per-page'>
      <SelectBox
        label={translate('per_page_label')}
        onChange={onChange}
        value={perPage}
        inline
      >
        {values.map((value, idx) => <option key={idx}>{value}</option>)}
      </SelectBox>
    </div>
  )
}

PerPage.defaultProps = {
  values: [10, 20, 30, 40, 50]
}

PerPage.propTypes = {
  /**
   * Selected value
   */
  perPage: PropTypes.number,
  /**
   * Possible no of results in one page
   */
  values: PropTypes.array,
  translate: PropTypes.func,
  dispatch: PropTypes.func
}

export default withTranslate(PerPage)
