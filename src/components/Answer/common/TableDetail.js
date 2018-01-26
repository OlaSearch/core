import React from 'react'
import withTranslate from './../../../decorators/withTranslate'
import withToggle from './../../../decorators/withToggle'
import { createHTMLMarkup } from './../../../utilities'

function TableDetail (props) {
  let {
    isCollapsed,
    toggleDisplay,
    data: { record_data, record_keys, caption, footnote },
    max,
    translate
  } = props
  let size = record_data.length
  return (
    <div className='ola-answer-table-detail'>
      {caption && <h4 className='ola-answer-table-caption'>{caption}</h4>}
      <div className='ola-answer-table-wrapper'>
        <table className='ola-answer-table'>
          <thead>
            <tr>{record_keys.map((key, idx) => <th key={idx}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {record_data
              .slice(0, isCollapsed ? undefined : max)
              .map((row, idx) => {
                return (
                  <tr key={idx}>
                    {record_keys.map((key, idx) => {
                      return (
                        <td key={idx}>
                          <div
                            dangerouslySetInnerHTML={createHTMLMarkup(row[key])}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      {footnote ? (
        <div
          className='ola-answer-footnote'
          dangerouslySetInnerHTML={createHTMLMarkup(footnote)}
        />
      ) : null}
      {size > max ? (
        <button className='ola-answer-link-more' onClick={toggleDisplay}>
          {isCollapsed
            ? translate('answers_show_less')
            : translate('answers_show_more')}
        </button>
      ) : null}
    </div>
  )
}

TableDetail.defaultProps = {
  max: 5
}

module.exports = withTranslate(withToggle(TableDetail))
