import React from 'react'

const PopularKeywords = ({ label, onClick }, context) => {
  let { popularKeywords } = context.config
  return (
    <div className='ola-popular-keywords'>
      <span className='ola-popular-label'>{label}</span>
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

PopularKeywords.defaultProps = {
  label: 'Popular keywords: '
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
        <a onClick={this.onClick}>
          {keyword}
        </a>
      </div>
    )
  }
}

module.exports = PopularKeywords
