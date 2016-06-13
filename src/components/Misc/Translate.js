import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const Translate = ({ id, translate }) => {
  return <span>{translate(id)}</span>
}

module.exports = injectTranslate(Translate)
