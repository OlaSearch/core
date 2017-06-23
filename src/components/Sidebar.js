import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'

const Sidebar = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className='ola-sidebar'>
      {children}
      <button
        onClick={toggleSidebar}
        type='button'
        className='ola-close-sidebar'
      >Close</button>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(Sidebar)
