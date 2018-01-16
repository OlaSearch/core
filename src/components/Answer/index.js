import React from 'react'
import classNames from 'classnames'
import AnswerSuggestion from './AnswerSuggestion'
import TableDetail from './common/TableDetail'
import ItemDetail from './common/ItemDetail'
import AnswerGrid from './AnswerGrid'
import AnswerGeneric from './AnswerGeneric'
import AnswerList from './AnswerList'
import AnswerMC from './AnswerMC'
import AnswerPersonInfoDetail from './AnswerPersonInfoDetail'
import {
  updateQueryTerm,
  executeSearch,
  changeAnswerSelection,
  setSkipIntent
} from './../../actions/Search'

function Answer ({ result, answer, mc, isLoading, dispatch, templates }) {
  function handleChange (option, index, itemKey) {
    dispatch(changeAnswerSelection(index, itemKey, answer))
  }
  function handleSkipIntent () {
    dispatch(updateQueryTerm(answer.original))
    dispatch(setSkipIntent(true))
    dispatch(executeSearch())
  }
  function templatePicker (template, data, module) {
    /* Check for user defined templates */
    if (templates && templates.hasOwnProperty(template)) {
      let Component = templates[template]
      return <Component data={data} module={module} />
    }
    switch (template) {
      case 'table_detail':
        return <TableDetail data={data} />

      case 'person_info_grid':
      case 'text':
        return <AnswerGrid data={data} result={result} answer={answer} />

      case 'item_detail':
        return <ItemDetail data={data} />

      case 'person_info_detail':
        return <AnswerPersonInfoDetail data={data} />

      case 'list':
        return <AnswerList data={data} />

      case 'generic':
        return <AnswerGeneric {...data} />

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className='ola-answer-loading'>
        <p>Loading instant answer</p>
      </div>
    )
  }
  if ((!answer || !answer.card) && !mc) return null

  let { card, module, intent } = answer

  /**
   * If the answer is from Intent engine
   */
  if (card) {
    let { template, source } = card
    let intentName = intent ? intent.split('.').pop() : null
    let snippetClass = classNames(
      'ola-snippet-answer',
      `ola-snippet-template-${template}`
    )
    let answerKlass = classNames(
      'ola-answer',
      `ola-answer-intent-${intentName}`,
      `ola-answer-template-${template}`
    )
    return (
      <div className={snippetClass}>
        <AnswerSuggestion
          answer={answer}
          onChange={handleChange}
          onSkipIntent={handleSkipIntent}
        />
        <div className={answerKlass}>
          {templatePicker(template, card, module)}
        </div>
        {source ? (
          <div className='ola-answer-source'>
            Source:{' '}
            <a target='_blank' href={source.url}>
              {source.name}
            </a>
          </div>
        ) : null}
      </div>
    )
  }

  if (mc) {
    return <AnswerMC mc={mc} />
  }

  /**
   * Check
   */
  return null
}

Answer.defaultProps = {
  answer: {}
}

module.exports = Answer
