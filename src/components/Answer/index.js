import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TableDetail from './common/TableDetail'
import ItemDetail from './common/ItemDetail'
import AnswerCard from './AnswerCard'
// import AnswerForm from './AnswerForm'
import AnswerCarousel from './AnswerCarousel'
import AnswerList from './AnswerList'
import AnswerMap from './AnswerMap'
import AnswerMC from './AnswerMC'
import {
  updateQueryTerm,
  executeSearch,
  changeAnswerSelection,
  setSkipIntent
} from './../../actions/Search'
import { BUTTON_TYPE } from './../../constants/Settings'
import withConfig from './../../decorators/withConfig'
import { connect } from 'react-redux'

/**
 * Display answers
 * @example ./Answer.md
 */
function Answer ({
  results,
  answer,
  location,
  mc,
  isLoading,
  dispatch,
  templates,
  onSelect,
  config
}) {
  // function handleChange (option, index, itemKey) {
  //   dispatch(changeAnswerSelection(index, itemKey, answer))
  // }
  // function handleSkipIntent () {
  //   dispatch(updateQueryTerm(answer.original))
  //   dispatch(setSkipIntent(true))
  //   dispatch(executeSearch())
  // }
  function handleClick ({ type, label, title, payload, url }) {
    /**
     * Label will be displayed in the bot
     */
    if (type === BUTTON_TYPE.POSTBACK) {
      return (
        onSelect &&
        onSelect({
          ...payload,
          label,
          query: label || title
        })
      )
    }
    if (type === BUTTON_TYPE.WEB) {
      return (window.location.href = url)
    }
    if (type === BUTTON_TYPE.EMAIL) {
      return (window.location.href = `mailto:${url}`)
    }
    onSelect && onSelect({ card })
  }
  function templatePicker (template, card, module) {
    /* Check for user defined templates */
    if (templates && templates.hasOwnProperty(template)) {
      const Component = templates[template]
      return <Component card={card} module={module} onSelect={handleClick} />
    }
    switch (template) {
      case 'list':
        return <AnswerList card={card} onSelect={handleClick} />

      case 'carousel':
        return <AnswerCarousel card={card} onSelect={handleClick} />

      case 'map':
        return (
          <AnswerMap
            card={card}
            onSelect={handleClick}
            results={results}
            location={location}
          />
        )

      case 'line_chart':
        return <AnswerLineChart card={card} onSelect={handleClick} />

      // case 'form':
      //   return <AnswerForm card={card} onSelect={handleClick} />

      case 'generic':
      default:
        return <AnswerCard card={card} onSelect={handleClick} />
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

  const { card, module, intent } = answer

  /**
   * If the answer is from Intent engine
   */
  if (card) {
    const { template } = card
    const intentName = intent ? intent.split('.').pop() : null
    const snippetClass = classNames(
      'ola-snippet-answer',
      `ola-snippet-template-${template}`
    )
    const answerKlass = classNames('ola-answer', {
      [`ola-answer-intent-${intentName}`]: intentName,
      [`ola-answer-template-${template}`]: template
    })
    return (
      <div className={snippetClass}>
        <div className={answerKlass}>
          {templatePicker(template, card, module)}
        </div>
      </div>
    )
  }

  if (config.mc && mc) {
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

Answer.propTypes = {
  /** Answer object */
  answer: PropTypes.object,
  /** Search results */
  results: PropTypes.object,
  /** Machine comprehension result */
  mc: PropTypes.object,
  /** Indicates if search is currently executing */
  isLoading: PropTypes.bool,
  /** Custom answer template */
  templates: PropTypes.object,
  /** On Answer click */
  onSelect: PropTypes.func
}

function mapStateToProps (state) {
  return {
    location: state.Context.location
  }
}

module.exports = connect(mapStateToProps)(withConfig(Answer))
