import React from 'react'
import classNames from 'classnames'
import injectTranslate from './../../decorators/OlaTranslate'
import AnswerField from './AnswerField'
import AnswerButton from './AnswerButton'

class AnswerList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  static defaultProps = {
    max: 3
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render () {
    let { data, max, translate } = this.props
    let { elements } = data
    let { isOpen } = this.state
    let size = elements.length
    return (
      <div className='ola-answer-list-info-detail'>
        <div className='ola-answer-list-items'>
          {elements
          .slice(0, isOpen ? undefined : max)
          .map((item, idx) => {
            let { title, subtitle, fields, buttons = [] } = item
            return (
              <div className='ola-answer-item' key={idx}>
                <div className='ola-answer-item-wrapper'>
                  <div className='ola-answer-title'>
                    <span className='ola-answer-title-text'>{title}</span>
                    <div className='ola-answer-subtitle'>{subtitle}</div>
                  </div>

                  <div className='ola-answer-keyvalue'>
                    {fields
                      .map((field, idx) => {
                        let klass = classNames('ola-answer-row', `ola-answer-row-${field.label}`)
                        return (
                          <AnswerField className={klass} {...field} key={idx} />
                        )
                      })}
                  </div>
                  {buttons.map((button, idx) => {
                    return (
                      <AnswerButton {...button} key={idx} />
                    )
                  })}

                </div>
              </div>
            )
          })
        }
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

module.exports = injectTranslate(AnswerList)
