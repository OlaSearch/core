import React from 'react'
import classNames from 'classnames'

const Suggestions = ({ results, ...rest }) => {
  return (
    <div className='ola-fuzzy-suggestions'>
      {results.map((result, idx) => <SuggestionItem key={idx} {...result} {...rest} />)}
    </div>
  )
}

/**
 * Suggestion item
 */
class SuggestionItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }
  }
  onMouseOver = () => {
    this.setState({
      isActive: true
    })
  };
  onMouseOut = () => {
    this.setState({
      isActive: false
    })
  };
  onSelect = () => {
    this.props.onSelect(this.props.term)
  };
  render () {
    let activeClass = this.state.isActive ? this.props.activeClassName : null
    let klass = classNames('ola-suggestion-item', activeClass)
    return (
      <a
        className={klass}
        onClick={this.onSelect}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >{this.props.term}</a>
    )
  }
}

module.exports = Suggestions
