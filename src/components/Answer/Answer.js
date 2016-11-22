import React from 'react'
import classNames from 'classnames'
import AnswerSuggestion from './AnswerSuggestion'
import AnswerCard from './AnswerCard'
import AnswerInfo from './AnswerInfo'
import { createHTMLMarkup } from './../../utilities'
import { updateQueryTerm, executeSearch, changeAnswerSelection, setSkipIntent } from './../../actions/Search'

class Answer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedAnswer: null
    }
  }
  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
  };
  handleChange = (option, index, itemKey) => {
    this.props.dispatch(changeAnswerSelection(index, itemKey, this.props.answer))
  };
  showAnswerCard = (answer) => {
    if (this.state.isOpen && answer === this.state.selectedAnswer) return this.hideAnswerCard()
    this.setState({
      isOpen: true,
      selectedAnswer: answer
    })
  };
  hideAnswerCard = () => {
    this.setState({
      isOpen: false,
      selectedAnswer: null
    })
  };
  handleClickOutside = () => {
    this.setState({
      isOpen: false
    })
  };
  handleSkipIntent = () => {
    this.props.dispatch(updateQueryTerm(this.props.answer.original))
    this.props.dispatch(setSkipIntent(true))
    this.props.dispatch(executeSearch())
  };
  componentWillReceiveProps (nextProps) {
    if (nextProps.answer !== this.props.answer) {
      this.hideAnswerCard()
    }
  }
  render () {
    const { answer, isLoading, result } = this.props

    if (isLoading) {
      return (
        <div className='ola-answer-loading'>
          <p>Loading instant answer</p>
        </div>
      )
    }
    /**
     * If the answer is from search engine
     */
    if (result) {
      return (
        <div className='ola-snippet-answer'>
          <div dangerouslySetInnerHTML={createHTMLMarkup(result.ola_answer)} />
        </div>
      )
    }
    if (!answer) return null
    let { data, source } = answer

    /**
     * If the answer is from Intent engine
     */
    if (data) {
      let klass = classNames('ola-answer-items', {
        'ola-answer-items-single': data.length === 1
      })
      return (
        <div className='ola-snippet-answer'>
          <AnswerSuggestion
            answer={answer}
            onChange={this.handleChange}
            onSkipIntent={this.handleSkipIntent}
          />
          {data.length
            ? <div className='ola-snippet ola-answer'>
              <div className={klass}>
                {data
                  .slice(0, 4)
                  .map((result, idx) => {
                    return (
                      <AnswerCard
                        key={result.title}
                        cdn={this.context.config.cdn}
                        result={result}
                        module={answer.module}
                        onSelect={this.showAnswerCard}
                        isActive={this.state.selectedAnswer === result}
                      />
                    )
                  })
                }
              </div>
              {this.state.isOpen
                ? <AnswerInfo answer={this.state.selectedAnswer} onClose={this.hideAnswerCard} />
                : null
              }
              {source
                ? <div className='ola-answer-source'>
                  Source: <a target='_blank' href={source.url}>{source.name}</a>
                </div>
                : null
              }
            </div>
            : null
          }
        </div>
      )
    }
    return null
  }
}

module.exports = Answer
