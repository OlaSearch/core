import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'
import FieldLabel from './FieldLabel'

const Directions = (props) => {
  var { latlong, translate, label, iconLeft = null, iconRight = null, onClick, result, log, fieldLabel, ...rest } = props

  if (!latlong) return null
  if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  var url = `https://www.google.com/maps/dir//${latlong}`

  function handleClick (event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Get Directions',
      eventAction: 'click',
      debounce: true,
      snippetId: props.snippetId
    })
    onClick && onClick(event)
  }

  return (
    <div className='ola-field ola-field-directions'>
      <FieldLabel label={fieldLabel} />
      <a className='ola-btn ola-btn-directions'
        onClick={handleClick}
        href={url}
        {...rest}
      >
        {iconLeft}
        {label || translate('get_directions_label')}
        {iconRight}
      </a>
    </div>
  )
}

module.exports = injectTranslate(withLogger(Directions))
