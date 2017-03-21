import React from 'react'
import injectTranslate from './../../../decorators/OlaTranslate'

class TableDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  static defaultProps = {
    max: 5
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render () {
    let { data: { record_data, record_keys, caption }, max, translate } = this.props
    let { isOpen } = this.state
    let size = record_data.length
    return (
      <div className='ola-answer-table-detail'>
        {caption && <h4 className='ola-answer-table-caption'>{caption}</h4>}
        <div className='ola-answer-table-wrapper'>
          <table className='ola-answer-table'>
            <thead>
              <tr>
                {record_keys.map((key, idx) => <th key={idx}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {record_data
                .slice(0, isOpen ? undefined : max)
                .map((row, idx) => {
                  return (
                    <tr key={idx}>
                      {record_keys.map((key, idx) => {
                        return (
                          <td key={idx}>{row[key]}</td>
                        )
                      })}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        {size > max
          ? <button className='ola-answer-link-more' onClick={this.toggle}>
            {isOpen
                ? translate('answers_show_less')
                : translate('answers_show_more')
              }
          </button>
          : null
        }
      </div>
    )
  }
}

module.exports = injectTranslate(TableDetail)
