import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const Translate = ({ id, translate, tagName = 'span' }) => {
  return React.createElement(tagName, null, translate(id))
}

module.exports = injectTranslate(Translate)
