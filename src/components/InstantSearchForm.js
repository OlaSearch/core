import React from 'react'
import PropTypes from 'prop-types'
import {
  updateQueryTerm,
  executeSearch,
  clearQueryTerm
} from './../actions/Search'
import Bookmarks from './Bookmarks'
import History from './History'
import SpeechInput from './Speech'
import { debounce, trim } from './../utilities'
import GeoLocation from './Geo/GeoLocation'
import withTranslate from './../decorators/withTranslate'
import withConfig from './../decorators/withConfig'
import withTheme from './../decorators/withTheme'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../constants/Settings'
import { connect } from 'react-redux'
import Search from '@olasearch/icons/lib/material-search'
import Cross from '@olasearch/icons/lib/x'
/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
class InstantSearchForm extends React.Component {
  constructor (props) {
    super(props)
    const { config } = props
    const { searchTimeoutMobile = 0, searchTimeout = 0 } = config
    const searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeout
    /**
     * Add url Sync option
     */
    this.executeSearch = () =>
      props.executeSearch({
        urlSync: props.urlSync
      })
    /**
     * Debounce search
     */
    this.searchDebounce = debounce(this.executeSearch, searchDelay)
  }

  state = {
    isFocused: false
  }

  static defaultProps = {
    minCharacters: 0,
    showGeoLocation: false,
    showBookmarks: true,
    showHistory: true,
    showSpeech: true,
    isPhone: false,
    urlSync: true,
    autoFocus: false,
    className: null
  }

  static propTypes = {
    q: PropTypes.string,
    minCharacters: PropTypes.number
  }

  componentDidMount () {
    if (this.props.autoFocus) this.refs.Input.focus()
  }

  onChange = (arg, searchInput) => {
    const { updateQueryTerm, minCharacters } = this.props
    const isEvent = !!arg.target
    const term = isEvent ? arg.target.value : arg

    /* Trim */
    if (term.length && trim(term) === '') return

    updateQueryTerm(term, searchInput)

    if (isEvent && term && term.length < minCharacters) return

    !isEvent && this.refs.Input.focus()

    isEvent ? this.searchDebounce() : this.executeSearch()
  }

  onSpeechChange = (text) => {
    this.onChange(text, SEARCH_INPUTS.VOICE)
  }

  onClear = () => {
    setTimeout(() => this.refs.Input.focus(), 100)
    this.props.clearQueryTerm()
    this.executeSearch()
  }

  onSubmit = (event) => event.preventDefault()

  onFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  onBlur = () => {
    this.setState({
      isFocused: false
    })
  }

  render () {
    const {
      q,
      showGeoLocation,
      showBookmarks,
      showHistory,
      showSpeech,
      translate,
      placeholder,
      theme
    } = this.props

    const { isFocused } = this.state

    const classes = classNames('ola-search-form', this.props.className, {
      'ola-search-focus': isFocused,
      'ola-speech-not-supported': !(
        window.SpeechRecognition || window.webkitSpeechRecognition
      )
    })

    const _placeholder = placeholder || translate('instantsearch_placeholder')

    return (
      <form className={classes} onSubmit={this.onSubmit}>
        <div className='ola-search-form-container'>
          <div className='ola-form-input-wrapper'>
            <input
              ref='Input'
              type='text'
              className='ola-text-input'
              placeholder={_placeholder}
              value={q}
              aria-label='Search input'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck='false'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
            />

            {showGeoLocation ? (
              <GeoLocation
                active={false}
                onSuccess={this.props.onGeoLocationSuccess}
                onFailure={this.props.onGeoLocationFailure}
                onDisable={this.props.onGeoLocationDisable}
                onError={this.props.onGeoError}
              />
            ) : null}

            {showSpeech ? (
              <SpeechInput
                onResult={this.onSpeechChange}
                onFinalResult={this.onSpeechChange}
                isInstantSearch
              />
            ) : null}
          </div>
          {q && (
            <button
              type='button'
              className='ola-clear-button'
              tabIndex='-1'
              onClick={this.onClear}
              aria-label='Clear Search'
            >
              <Cross />
            </button>
          )}
          <button
            type='button'
            className='ola-search-button'
            onClick={this.onClear}
            aria-label='Clear'
          >
            <Search />
          </button>
        </div>
        <style jsx>
          {`
            .ola-search-focus :global(.ola-search-form-container) {
              border-color: ${theme.primaryColor};
              box-shadow: none;
            }
          `}
        </style>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    q: state.QueryState.q
  }
}

export default connect(mapStateToProps, {
  updateQueryTerm,
  executeSearch,
  clearQueryTerm
})(withTheme(withConfig(withTranslate(InstantSearchForm))))
