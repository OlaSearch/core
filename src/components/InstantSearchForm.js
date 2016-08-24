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
/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
class InstantSearchForm extends React.Component {
  constructor (props, context) {
    super(props)
    let { config } = context
    let { searchTimeoutMobile = 0, searchTimeOut = 0 } = config
    let searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeOut
    /**
     * Add url Sync option
     */
    this.executeSearch = () => props.dispatch(executeSearch({
      urlSync: props.urlSync
    }))

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
    config: React.PropTypes.object
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    q: React.PropTypes.string,
    minCharacters: React.PropTypes.number
  };

  componentDidMount () {
    if (this.props.autoFocus) this.Input.focus()
  }

  onChange = (arg, searchInput) => {
    let { dispatch, minCharacters } = this.props
    let isEvent = !!arg.target
    let term = isEvent ? arg.target.value : arg

    /* Trim */
    if (term.length && trim(term) === '') return

    dispatch(updateQueryTerm(term, searchInput))

    if (isEvent && term && term.length < minCharacters) return

    !isEvent && this.Input.focus()

    isEvent ? this.searchDebounce() : this.executeSearch()
  };

  onSpeechChange = (text) => {
    this.onChange(text, SEARCH_INPUTS.VOICE)
  };

  onClear = () => {
    let { dispatch } = this.props
    setTimeout(() => this.Input.focus(), 100)
    dispatch(clearQueryTerm())
    this.executeSearch()
  };

  onSubmit = (event) => event.preventDefault();
  onChangeZone = () => {
    this.Input.focus()

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
      translate
    } = this.props

    let button = q
      ? <button type='button' className='ola-clear-button' onClick={this.onClear} aria-label='Clear'></button>
      : <button type='button' className='ola-search-button' onClick={this.onClear} aria-label='Submit'></button>

    let klass = classNames('ola-search-form', {
      'ola-search-zone-enabled': showZone,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    })

    return (
      <form className={klass} onSubmit={this.onSubmit}>
        <div className='ola-search-form-container'>
          {showZone &&
            <Zone
              onChange={this.onChangeZone}
            />
          }
          <input
            ref={(c) => { this.Input = c }}
            type='text'
            className='ola-text-input ola-text-input-round'
            placeholder={translate('instantsearch_placeholder')}
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

module.exports = injectTranslate(InstantSearchForm)
