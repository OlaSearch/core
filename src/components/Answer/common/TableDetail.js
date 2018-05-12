import React from 'react'
import withTranslate from './../../../decorators/withTranslate'
import withToggle from './../../../decorators/withToggle'
import { createHTMLMarkup } from './../../../utilities'

function TableDetail (props) {
  const {
    isCollapsed,
    toggle,
    card: { record_data: data, record_keys: keys, caption, footnote },
    max,
    translate
  } = props
  const size = data.length
  return (
    <div className='ola-answer-table-detail'>
      {caption && <h4 className='ola-answer-table-caption'>{caption}</h4>}
      <div className='ola-answer-table-wrapper'>
        <table className='ola-answer-table'>
          <thead>
            <tr>{keys.map((key, idx) => <th key={idx}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {data.slice(0, isCollapsed ? undefined : max).map((row, idx) => {
              return (
                <tr key={idx}>
                  {keys.map((key, idx) => {
                    return (
                      <td key={key}>
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
        <button className='ola-answer-link-more' onClick={toggle}>
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
