import React from 'react'
import { updateQueryTerm, executeSearch, clearQueryTerm } from './../actions/Search'
import Bookmarks from './Bookmarks'
import History from './History'
import SpeechInput from './Speech'
import { debounce } from './../utilities'
import GeoLocation from './Geo/GeoLocation'
import injectTranslate from './../decorators/olaTranslate'
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
    this.searchDebounce = debounce(() => props.dispatch(executeSearch()), searchDelay)
  }

  static defaultProps = {
    minCharacters: 0,
    showGeoLocation: false,
    showBookmarks: true,
    showHistory: true,
    isPhone: false
  };

  static contextTypes = {
    config: React.PropTypes.object
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    q: React.PropTypes.string,
    minCharacters: React.PropTypes.number
  };

  onChange = (arg) => {
    let { dispatch, minCharacters } = this.props
    let isEvent = !!arg.target
    let term = isEvent ? arg.target.value : arg

    dispatch(updateQueryTerm(term))

    if (isEvent && term && term.length < minCharacters) return

    !isEvent && this.refs.Input.focus()

    isEvent ? this.searchDebounce() : dispatch(executeSearch())
  };

  onClear = () => {
    let { dispatch } = this.props
    setTimeout(() => this.refs.Input.focus(), 100)
    dispatch(clearQueryTerm())
    dispatch(executeSearch())
  };

  onSubmit = (event) => event.preventDefault()

  render () {
    let {
      q,
      showGeoLocation,
      showBookmarks,
      showHistory,
      translate
    } = this.props

    let button = q
      ? <button type='button' className='ola-clear-button' onClick={this.onClear} aria-label='Clear'></button>
      : <button type='button' className='ola-search-button' onClick={this.onClear} aria-label='Submit'></button>

    return (
      <form className='ola-search-form' onSubmit={this.onSubmit}>
        <div className='ola-search-form-container'>
          <input
            ref='Input'
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

          {showBookmarks && <Bookmarks />}

          {showGeoLocation &&
            <GeoLocation
              active={false}
              onSuccess={this.props.onGeoLocationSuccess}
              onFailure={this.props.onGeoLocationFailure}
              onDisable={this.props.onGeoLocationDisable}
              onError={this.props.onGeoError}
            />
          }

          {showHistory && <History searchUrl={this.props.searchUrl} />}

          <SpeechInput
            onResult={this.onChange}
            onFinalResult={this.onChange}
            isInstantSearch
          />
        </div>
      </form>
    )
  }
}

module.exports = injectTranslate(InstantSearchForm)
