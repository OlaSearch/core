import React from 'react'
import ListKeyValue from './common/ListKeyValue'
import injectTranslate from './../../decorators/OlaTranslate'

class AnswerPersonInfoDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  static defaultProps = {
    max: 6
  }
  toggle = () => this.setState({ isOpen: !this.state.isOpen })
  render () {
    let { data, max, translate } = this.props
    let { caption } = data
    let { isOpen } = this.state
    let size = data.length
    return (
      <div className='ola-answer-person-info-detail'>
        {caption && <h4 className='ola-answer-table-caption'>{caption}</h4>}
        <div className='ola-answer-person-items'>
          {data.slice(0, isOpen ? undefined : max).map((item, idx) => {
            let {
              title,
              subtitle,
              description,
              additional_data: additionalData
            } = item
            return (
              <div className='ola-answer-item' key={idx}>
                <div className='ola-answer-title'>
                  <span className='ola-answer-title-text'>{title}</span>
                  <div className='ola-answer-subtitle'>
                    {subtitle || description}
                  </div>
                </div>

                <ListKeyValue data={additionalData} />
              </div>
            )
          })}
        </div>
        {!isOpen && size > max ? (
          <button className='ola-answer-link-more' onClick={this.toggle}>
            {isOpen
              ? translate('answers_show_less')
              : translate('answers_show_more')}
          </button>
        ) : null}
      </div>
    )
  }
}

module.exports = injectTranslate(AnswerPersonInfoDetail)
