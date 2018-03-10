import React from 'react'
import PropTypes from 'prop-types'
import ListKeyValue from './common/ListKeyValue'
import AnswerCard from './AnswerCard'
import classNames from 'classnames'
import withConfig from './../../decorators/withConfig'

class AnswerGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedAnswer: null
    }
  }
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
  }
  hideAnswerCard = () => {
    this.setState({
      isOpen: false,
      selectedAnswer: null
    })
  }
  handleClickOutside = () => {
    this.setState({
      isOpen: false
    })
  }
  render () {
    let { data, answer } = this.props
    let klass = classNames('ola-answer-items', {
      'ola-answer-items-single': data.length === 1
    })
    return (
      <div className='ola-answer-grid'>
        <div className={klass}>
          {data.slice(0, 4).map((result, idx) => {
            return (
              <AnswerCard
                key={result.title}
                cdn={this.props.config.cdn}
                imagePlaceholder={this.props.config.imagePlaceholder}
                result={result}
                module={answer.module}
                onSelect={this.showAnswerCard}
                isActive={this.state.selectedAnswer === result}
              />
            )
          })}
        </div>
        {this.state.isOpen ? (
          <ListKeyValue
            data={this.state.selectedAnswer.additional_data}
            onClose={this.hideAnswerCard}
          />
        ) : null}
      </div>
    )
  }
}

export default withConfig(AnswerGrid)
