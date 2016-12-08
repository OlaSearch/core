import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

class AnswerTable extends React.Component {
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
    let { data: { record_data, record_keys }, max, translate } = this.props
    let { isOpen } = this.state
    let size = record_data.length
    return (
      <div className='ola-answer-table-detail'>
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
                    {record_keys.map((key) => {
                      return (
                        <td>{row[key]}</td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {!isOpen && size > max
          ? <button className='ola-answer-link-more' onClick={this.toggle}>{translate('answers_show_more')}</button>
          : null
        }
      </div>
    )
  }
}

module.exports = injectTranslate(AnswerTable)
