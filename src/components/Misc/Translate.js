import React from 'react'
import withTranslate from './../../decorators/withTranslate'

function Translate ({ id, translate, tagName }) {
  return React.createElement(tagName, null, translate(id))
}

Translate.defaultProps = {
  tagName: 'span'
}

export default withTranslate(Translate)
