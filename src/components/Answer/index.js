import React from 'react'
import AnswerSuggestion from './AnswerSuggestion'
import TableDetail from './common/TableDetail'
import ItemDetail from './common/ItemDetail'
import AnswerGrid from './AnswerGrid'
import AnswerPersonInfoDetail from './AnswerPersonInfoDetail'
import { updateQueryTerm, executeSearch, changeAnswerSelection, setSkipIntent } from './../../actions/Search'

class Answer extends React.Component {
  handleChange = (option, index, itemKey) => {
    this.props.dispatch(changeAnswerSelection(index, itemKey, this.props.answer))
  };
  handleSkipIntent = () => {
    this.props.dispatch(updateQueryTerm(this.props.answer.original))
    this.props.dispatch(setSkipIntent(true))
    this.props.dispatch(executeSearch())
  };
  templatePicker = (template, data, module) => {
    /* Check for user defined templates */
    if (this.props.templates && this.props.templates.hasOwnProperty(template)) {
      let Component = this.props.templates[template]
      return <Component data={data} module={module} />
    }
    switch (template) {
      case 'table_detail':
        return (
          <TableDetail
            data={data}
          />
        )

      case 'person_info_grid':
      case 'text':
        return (
          <AnswerGrid
            data={data}
            result={this.props.result}
            answer={this.props.answer}
          />
        )

      case 'item_detail':
        return <ItemDetail data={data} />

      case 'person_info_detail':
        return (
          <AnswerPersonInfoDetail
            data={data}
          />
        )

      default:
        return null
    }
  };
  render () {
    const { answer, isLoading } = this.props

    if (isLoading) {
      return (
        <div className='ola-answer-loading'>
          <p>Loading instant answer</p>
        </div>
      )
    }

    if (!answer) return null

    let { data, template, module, source } = answer
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
            {this.templatePicker(template, data, module)}
          </div>
          {source
            ? <div className='ola-answer-source'>
              Source: <a target='_blank' href={source.url}>{source.name}</a>
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
