import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const PopularKeywords = ({ onClick, translate }, context) => {
  let { popularKeywords } = context.config
  return (
    <div className='ola-popular-keywords'>
      <span className='ola-popular-label'>{translate('popular_keywords')}: </span>
      {popularKeywords.map((keyword, idx) => {
        return (
          <PopularKeywordItem
            keyword={keyword}
            onClick={onClick}
            key={idx}
          />
        )
      })}
    </div>
  )
}

PopularKeywords.contextTypes = {
  config: React.PropTypes.object
}

/**
 * Item
 */
class PopularKeywordItem extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.keyword)
  };
  render () {
    let { keyword } = this.props
    return (
      <div className='ola-popular-keyword'>
        <a onClick={this.onClick}>{keyword}</a>
      </div>
    )
  }
}

module.exports = injectTranslate(PopularKeywords)
