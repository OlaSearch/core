import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withTheme from './../../decorators/withTheme'
import ChevronDown from '@olasearch/icons/lib/chevron-down'

function LoadMore ({
  totalResults,
  currentPage,
  perPage,
  actions,
  onLoadMore,
  isLoading,
  beforeChangePage,
  translate,
  theme,
  textBottom
}) {
  if (currentPage * perPage >= totalResults) return null
  let klass = classNames('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  })
  function handleClick () {
    if (beforeChangePage) beforeChangePage()
    onLoadMore ? onLoadMore() : actions.loadMore()
  }
  let text = isLoading
    ? translate('load_more_button_loading')
    : translate('load_more_button')
  return (
    <button
      type='button'
      className={klass}
      disabled={isLoading}
      onClick={handleClick}
    >
      {textBottom ? null : (
        <span className='ola-link-load-more-text'>{text}</span>
      )}
      <ChevronDown />
      {textBottom ? (
        <span className='ola-link-load-more-text'>{text}</span>
      ) : null}
      <style jsx>
        {`
          /* Load more */
          .ola-link-load-more,
          .ola-link-load-more:focus,
          .ola-link-load-more:hover,
          .ola-link-load-more:active {
            background: ${theme.primaryButtonBackground};
            color: ${theme.primaryButtonColor};
            font-size: ${theme.mediumFontSize};
          }
        `}
      </style>
    </button>
  )
}

LoadMore.propTypes = {
  actions: PropTypes.shape({
    loadMore: PropTypes.func.isRequired
  }),
  totalResults: PropTypes.any.isRequired,
  currentPage: PropTypes.any.isRequired,
  perPage: PropTypes.any.isRequired,
  isLoading: PropTypes.boolean
}

LoadMore.defaultProps = {
  isLoading: false
}

module.exports = withTheme(withTranslate(LoadMore))
