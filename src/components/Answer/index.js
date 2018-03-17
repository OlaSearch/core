import React from 'react'
import classNames from 'classnames'
import AnswerSuggestion from './AnswerSuggestion'
import TableDetail from './common/TableDetail'
import ItemDetail from './common/ItemDetail'
import AnswerCard from './AnswerCard'
import AnswerList from './AnswerList'
import AnswerMC from './AnswerMC'
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
  function templatePicker (template, card, module) {
    /* Check for user defined templates */
    if (templates && templates.hasOwnProperty(template)) {
      let Component = templates[template]
      return <Component card={card} module={module} />
    }
    switch (template) {
      case 'list':
        return <AnswerList card={card} />

      case 'map':
        return <AnswerMap card={card} />

      case 'line_chart':
        return <AnswerLineChart card={card} />

      case 'generic':
      default:
        return <AnswerCard card={card} />
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
