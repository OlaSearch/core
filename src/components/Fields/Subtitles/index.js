import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup, sanitizeAnchor } from './../../../utilities'
import FieldLabel from './../FieldLabel'
import LinkIcon from '@olasearch/icons/lib/link'

/**
 * Display sub-headings (h2) in search result snippet so user can jump directly to it
 */
function Subtitles ({ subtitles, baseUrl, displayIcon, iconSize, fieldLabel }) {
  if (!subtitles || !subtitles.length) return null
  const icon = displayIcon ? (
    <span className='ola-flex-icon'>
      <LinkIcon size={iconSize} />
    </span>
  ) : null
  return (
    <div className='ola-field ola-field-subtitles'>
      <FieldLabel label={fieldLabel} />
      <ul className='ola-field-subtitles-list'>
        {subtitles.map((subtitle, idx) => {
          const url = `${baseUrl}#${sanitizeAnchor(subtitle)}`
          return (
            <li key={idx}>
              <a href={url} className='ola-flex ola-btn-subtitle'>
                {icon}
                <span
                  className='ola-flex-content'
                  dangerouslySetInnerHTML={createHTMLMarkup(subtitle)}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Subtitles.propTypes = {
  /**
   * List of subtitles
   */
  subtitles: PropTypes.array,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string,
  /**
   * Displays a date icon
   */
  displayIcon: PropTypes.bool,
  /**
   * Icon size
   */
  iconSize: PropTypes.number,
  /**
   * Search result
   */
  result: PropTypes.object
}

Subtitles.defaultProps = {
  iconSize: 16
}

export default Subtitles
