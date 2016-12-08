import React from 'react'
import AnswerSuggestion from './AnswerSuggestion'
import AnswerTableDetail from './AnswerTableDetail'
import AnswerGrid from './AnswerGrid'
import AnswerPersonInfoDetail from './AnswerPersonInfoDetail'
import { createHTMLMarkup } from './../../utilities'
import { updateQueryTerm, executeSearch, changeAnswerSelection, setSkipIntent } from './../../actions/Search'

class Answer extends React.Component {
  handleChange = (option, index, itemKey) => {
    console.log(index, itemKey, this.props.answer)
    this.props.dispatch(changeAnswerSelection(index, itemKey, this.props.answer))
  };
  handleSkipIntent = () => {
    this.props.dispatch(updateQueryTerm(this.props.answer.original))
    this.props.dispatch(setSkipIntent(true))
    this.props.dispatch(executeSearch())
  };
  templatePicker = (template, data) => {
    switch (template) {
      case 'table_detail':
        return <AnswerTableDetail data={data} />

      case 'person_info_grid':
      case 'text':
        return (
          <AnswerGrid
            data={data}
            result={this.props.result}
            answer={this.props.answer}
          />
        )

      case 'person_info_detail':
        return (<AnswerPersonInfoDetail
          data={data}
        />)

      default:
        return null
    }
  };
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
    let { data, template } = answer
    /**
     * If the answer is from Intent engine
     */
    if (data) {
      return (
        <div className='ola-snippet-answer'>
          <AnswerSuggestion
            answer={answer}
            onChange={this.handleChange}
            onSkipIntent={this.handleSkipIntent}
          />
          <div className='ola-answer'>
            {this.templatePicker(template, data)}
          </div>
        </div>
      )
    }
    return null
  }
}

module.exports = Answer
