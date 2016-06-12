import React from 'react'
import { updateQueryTerm, executeSearch, clearQueryTerm } from './../actions/Search'
import Bookmarks from './Bookmarks'
import History from './History'
import SpeechInput from './Speech'
import { debounce } from './../utilities'
import GeoLocation from './Geo/GeoLocation'
import withTranslate from './../decorators/OlaTranslate'

class InstantSearchForm extends React.Component {
  constructor (props, context) {
    super(props)

    this.instantSearchDebounce = debounce(() => this.props.dispatch(executeSearch()), context.config.searchTimeOut)
  }

  static defaultProps = {
    minCharacters: 0,
    showGeoLocation: false
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

    isEvent ? this.instantSearchDebounce() : dispatch(executeSearch())
  };

  onClear = () => {
    var { dispatch } = this.props

    setTimeout(() => this.refs.Input.focus(), 100)

    dispatch(clearQueryTerm())

    dispatch(executeSearch())
  };

  onSubmit = (event) => event.preventDefault()

  render () {
    let {
      q,
      showGeoLocation,
      translate
    } = this.props

    console.log(translate('instantsearch.placeholder'))

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
            placeholder={translate('instantsearch.placeholder')}
            value={q}
            aria-label='searchInput'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
          />
          {button}

          <Bookmarks />

          {showGeoLocation &&
            <GeoLocation
              active={false}
              onSuccess={this.props.onGeoLocationSuccess}
              onFailure={this.props.onGeoLocationFailure}
              onDisable={this.props.onGeoLocationDisable}
              onError={this.props.onGeoError}
            />
          }

          <History searchUrl={this.props.searchUrl} />

          <SpeechInput
            onResult={this.onChange}
            onFinalResult={this.onChange}
          />
        </div>
      </form>
    )
  }
}

module.exports = withTranslate(InstantSearchForm)
