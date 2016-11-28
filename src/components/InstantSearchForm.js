import React from 'react'
import { updateQueryTerm, executeSearch, clearQueryTerm } from './../actions/Search'
import Bookmarks from './Bookmarks'
import History from './History'
import SpeechInput from './Speech'
import { debounce, trim } from './../utilities'
import GeoLocation from './Geo/GeoLocation'
import injectTranslate from './../decorators/OlaTranslate'
import Zone from './Zone'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../constants/Settings'
import { connect } from 'react-redux'
/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
class InstantSearchForm extends React.Component {
  constructor (props, context) {
    super(props)
    let { config } = context
    let { searchTimeoutMobile = 0, searchTimeout = 0 } = config
    let searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeout
    /**
     * Add url Sync option
     */
    this.executeSearch = () => props.executeSearch({
      urlSync: props.urlSync
    })
    /**
     * Debounce search
     */
    this.searchDebounce = debounce(this.executeSearch, searchDelay)
  }

  static defaultProps = {
    minCharacters: 0,
    showGeoLocation: false,
    showBookmarks: true,
    showHistory: true,
    showSpeech: true,
    showZone: false,
    isPhone: false,
    urlSync: true,
    autoFocus: false
  };

  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
  };

  static propTypes = {
    q: React.PropTypes.string,
    minCharacters: React.PropTypes.number
  };

  componentDidMount () {
    if (this.props.autoFocus) this.refs.Input.focus()
  }

  onChange = (arg, searchInput) => {
    let { updateQueryTerm, minCharacters } = this.props
    let isEvent = !!arg.target
    let term = isEvent ? arg.target.value : arg

    /* Trim */
    if (term.length && trim(term) === '') return

    updateQueryTerm(term, searchInput)

    if (isEvent && term && term.length < minCharacters) return

    !isEvent && this.refs.Input.focus()

    isEvent ? this.searchDebounce() : this.executeSearch()
  };

  onSpeechChange = (text) => {
    this.onChange(text, SEARCH_INPUTS.VOICE)
  };

  onClear = () => {
    setTimeout(() => this.refs.Input.focus(), 100)
    this.props.clearQueryTerm()
    this.executeSearch()
  };

  onSubmit = (event) => event.preventDefault();
  onChangeZone = () => {
    this.refs.Input.focus()

    if (this.props.onChangeZone) return this.props.onChangeZone()
    if (this.props.q) this.executeSearch()
  };

  render () {
    let {
      q,
      showGeoLocation,
      showBookmarks,
      showHistory,
      showZone,
      showSpeech,
      translate,
      placeholder
    } = this.props

    let button = q
      ? <button type='button' className='ola-clear-button' onClick={this.onClear} aria-label='Clear' />
      : <button type='button' className='ola-search-button' onClick={this.onClear} aria-label='Submit' />

    let klass = classNames('ola-search-form', {
      'ola-search-zone-enabled': showZone,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    })

    let _placeholder = placeholder || translate('instantsearch_placeholder')

    return (
      <form className={klass} onSubmit={this.onSubmit}>
        <div className='ola-search-form-container'>
          {showZone &&
            <Zone
              onChange={this.onChangeZone}
            />
          }
          <input
            ref='Input'
            type='text'
            className='ola-text-input ola-text-input-round'
            placeholder={_placeholder}
            value={q}
            aria-label='Search input'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
          />
          {button}

          {showBookmarks
            ? <Bookmarks />
            : null
          }

          {showGeoLocation
            ? <GeoLocation
              active={false}
              onSuccess={this.props.onGeoLocationSuccess}
              onFailure={this.props.onGeoLocationFailure}
              onDisable={this.props.onGeoLocationDisable}
              onError={this.props.onGeoError}
            />
            : null
          }

          {showHistory
            ? <History searchUrl={this.props.searchUrl} />
            : null
          }

          {showSpeech
            ? <SpeechInput
              onResult={this.onSpeechChange}
              onFinalResult={this.onSpeechChange}
              isInstantSearch
            />
            : null
          }
        </div>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    q: state.QueryState.q
  }
}

module.exports = connect(mapStateToProps, { updateQueryTerm, executeSearch, clearQueryTerm })(injectTranslate(InstantSearchForm))

