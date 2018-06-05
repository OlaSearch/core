import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearHistory } from './../../actions/History'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import HistoryItem from './HistoryItem'
import classNames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import { log } from './../../actions/Logger'
import { sortHistory } from './../../utilities'

class History extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleClickOutside = (event) => {
    this.setState({
      isOpen: false
    })
  }

  toggleVisibility = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        if (this.state.isOpen) {
          this.props.onOpen && this.props.onOpen()

          this.props.dispatch(
            log({
              eventType: 'C',
              eventCategory: 'History button',
              eventAction: 'open',
              eventLabel: 'History',
              payload: this.props.logPayload,
              debounce: true
            })
          )
        }
      }
    )
  }

  clearHistory = () => {
    this.props.dispatch(clearHistory())
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.history !== this.props.history ||
      nextState.isOpen !== this.state.isOpen
    )
  }

  render () {
    var { history, translate, searchPageUrl } = this.props

    var { isOpen } = this.state

    var klass = classNames({
      'ola-module': true,
      'ola-js-hide': !isOpen
    })

    const hasHistory = history.length > 0

    /* Sort history based on popularity */
    history = history.sort(sortHistory)

    return (
      <div className='ola-history-container'>
        <button
          type='button'
          className='ola-link-history'
          onClick={this.toggleVisibility}
        >
          <span
            className='ola-btn-hint'
            aria-label={translate('history_label')}
          />
        </button>
        <div className={klass}>
          <div className='ola-module-title'>
            <span>{translate('history_label')} </span>
            {hasHistory ? (
              <button
                type='button'
                className='ola-fake-button ola-clear'
                onClick={this.clearHistory}
              >
                (clear)
              </button>
            ) : null}
          </div>
          <div className='ola-module-body'>
            {!hasHistory && (
              <div className='ola-module-item'>
                {translate('history_empty_label')}
              </div>
            )}
            {history.map((item, idx) => (
              <HistoryItem
                searchPageUrl={searchPageUrl}
                history={item}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    history: state.AppState.history
  }
}

const HistoryContainer = connect(mapStateToProps)(
  withTranslate(listensToClickOutside(History))
)
const HistoryWrapper = (props) => {
  let { searchHistory, searchPageUrl } = props.config
  if (searchHistory) {
    return <HistoryContainer searchPageUrl={searchPageUrl} {...props} />
  }
  return null
}

module.exports = withConfig(HistoryWrapper)
