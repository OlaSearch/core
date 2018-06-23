import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'
import {
  STYLE_TAG_ID,
  MODAL_ROOT_CLASSNAME,
  BODY_STYLE_MODAL
} from './../constants/Settings'
import withTheme from './../decorators/withTheme'
import withConfig from './../decorators/withConfig'
import withTranslate from './../decorators/withTranslate'

class Sidebar extends React.Component {
  componentDidMount () {
    if (this.props.isDesktop || document.getElementById(STYLE_TAG_ID)) return
    /* Add inline css */
    const style = document.createElement('style')
    style.id = STYLE_TAG_ID
    style.type = 'text/css'
    style.innerHTML = BODY_STYLE_MODAL
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  componentDidUpdate (prevProps) {
    if (
      prevProps.isSidebarOpen !== this.props.isSidebarOpen &&
      !this.props.isDesktop
    ) {
      document.documentElement.classList.toggle(
        MODAL_ROOT_CLASSNAME,
        this.props.isSidebarOpen
      )
    }
  }
  render () {
    const {
      children,
      toggleSidebar,
      isSidebarOpen,
      theme,
      translate,
      config
    } = this.props
    if (!config.sidebar) return null
    return (
      <div className='ola-sidebar'>
        {isSidebarOpen ? (
          <React.Fragment>
            <div className='ola-sidebar-title'>{translate('filter_title')}</div>
            {children}
            <button
              onClick={toggleSidebar}
              type='button'
              className='ola-close-sidebar'
            >
              {translate('filter_close')}
            </button>
          </React.Fragment>
        ) : null}
        <style jsx>
          {`
            .ola-sidebar :global(.ola-close-sidebar) {
              background: ${theme.primaryButtonBackground};
              color: ${theme.primaryButtonColor};
            }
            .ola-sidebar :global(.ola-facet-link) {
              color: ${theme.primaryColor};
              font-weight: normal;
            }
          `}
        </style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    isDesktop: state.Device.isDesktop
  }
}

export default connect(mapStateToProps, { toggleSidebar })(
  withConfig(withTranslate(withTheme(Sidebar)))
)
