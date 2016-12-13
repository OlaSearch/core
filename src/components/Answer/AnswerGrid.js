import React from 'react'
import ListKeyValue from './common/ListKeyValue'
import AnswerCard from './AnswerCard'
import classNames from 'classnames'

export default class AnswerGrid extends React.Component {
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
  componentWillReceiveProps (nextProps) {
    if (nextProps.answer !== this.props.answer) {
      this.hideAnswerCard()
    }
  }
  showAnswerCard = (answer) => {
    if (this.state.isOpen && answer === this.state.selectedAnswer) {
      return this.hideAnswerCard()
    }
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
  render () {
    let { data, answer } = this.props
    let klass = classNames('ola-answer-items', {
      'ola-answer-items-single': data.length === 1
    })
    return (
      <div className='ola-answer-grid'>
        <div className={klass}>
          {data
            .slice(0, 4)
            .map((result, idx) => {
              return (
                <AnswerCard
                  key={result.title}
                  cdn={this.context.config.cdn}
                  imagePlaceholder={this.context.config.imagePlaceholder}
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
          ? <ListKeyValue data={this.state.selectedAnswer.additional_data} onClose={this.hideAnswerCard} />
          : null
        }
      </div>
    )
  }
}
