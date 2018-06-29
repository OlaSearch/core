import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AnswerCard from './AnswerCard'
import AnswerLineChart from './AnswerLineChart'
import AnswerCarousel from './AnswerCarousel'
import AnswerList from './AnswerList'
import AnswerMap from './AnswerMap'
import AnswerMC from './AnswerMC'
import AnswerVideo from './AnswerVideo'
import AnswerEmbed from './AnswerEmbed'
import AnswerTable from './AnswerTable'
import AnswerArticle from './AnswerArticle'
// import {
//   updateQueryTerm,
//   executeSearch,
//   changeAnswerSelection,
//   setSkipIntent
// } from './../../actions/Search'
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
  // dispatch,
  templates,
  onSelect,
  config,
  isSidebarOpen
}) {
  const refreshTrigger = isSidebarOpen
  // function handleChange (option, index, itemKey) {
  //   dispatch(changeAnswerSelection(index, itemKey, answer))
  // }
  // function handleSkipIntent () {
  //   dispatch(updateQueryTerm(answer.original))
  //   dispatch(setSkipIntent(true))
  //   dispatch(executeSearch())
  // }
  function handleClick ({ type, label, title, payload, url, new_window }) {
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
      if (new_window) return window.open(url)
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
      return (
        <Component
          card={card}
          module={module}
          onSelect={handleClick}
          refresh={refreshTrigger}
        />
      )
    }
    switch (template) {
      case 'list':
        return (
          <AnswerList
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

      case 'carousel':
        return (
          <AnswerCarousel
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

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
        return (
          <AnswerLineChart
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
            chartOptions={config.chartOptions}
          />
        )

      case 'video':
        return (
          <AnswerVideo
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

      case 'embed':
        return (
          <AnswerEmbed
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

      case 'table':
        return (
          <AnswerTable
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

      case 'article':
        return (
          <AnswerArticle
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )

      case 'generic':
      default:
        return (
          <AnswerCard
            card={card}
            onSelect={handleClick}
            refresh={refreshTrigger}
          />
        )
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
    location: state.Context.location,
    isSidebarOpen: state.AppState.isSidebarOpen
  }
}

export default connect(mapStateToProps)(withConfig(Answer))
