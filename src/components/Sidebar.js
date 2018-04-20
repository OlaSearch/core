import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'
import { STYLE_TAG_ID, MODAL_ROOT_CLASSNAME } from './../constants/Settings'
import withTheme from './../decorators/withTheme'
import withConfig from './../decorators/withConfig'
import withTranslate from './../decorators/withTranslate'

class Sidebar extends React.Component {
  componentDidMount () {
    if (document.getElementById(STYLE_TAG_ID) || this.props.isDesktop) return
    /* Add inline css */
    var style = document.createElement('style')
    style.id = STYLE_TAG_ID
    style.type = 'text/css'
    style.innerHTML = this.props.isDesktop
      ? ``
      : `
      .${MODAL_ROOT_CLASSNAME}, .${MODAL_ROOT_CLASSNAME} body{
        -webkit-overflow-scrolling : touch !important;
        overflow: hidden !important;
        height: 100% !important;
    `
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.isSidebarOpen !== this.props.isSidebarOpen) {
      document.documentElement.classList.toggle(
        MODAL_ROOT_CLASSNAME,
        this.props.isSidebarOpen
      )
    }
  }
  render () {
    let {
      children,
      showSidebar,
      toggleSidebar,
      isSidebarOpen,
      theme,
      translate,
      config
    } = this.props
    if (!config.sidebar) return null
    return (
      <div className='ola-sidebar'>
        <div className='ola-sidebar-title'>{translate('filter_title')}</div>
        {isSidebarOpen && children}
        <button
          onClick={toggleSidebar}
          type='button'
          className='ola-close-sidebar'
        >
          {translate('filter_close')}
        </button>
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
            .ola-sidebar :global(.ola-facet) {
              font-size: ${theme.mediumFontSize};
            }
            .ola-sidebar :global(.ola-facet-title) {
              // font-size: ${theme.defaultFontSize};
            }
          `}
        </style>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    showSidebar: state.AppState.showSidebar,
    isDesktop: state.Device.isDesktop
  }
}

export default connect(mapStateToProps, { toggleSidebar })(
  withConfig(withTranslate(withTheme(Sidebar)))
)
