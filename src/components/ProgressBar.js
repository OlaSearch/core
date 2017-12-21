import React from 'react'
import LineProgress from 'react-line-progress'
import { connect } from 'react-redux'

function ProgressBar ({ isLoading, isLoadingAnswer }) {
  return (
    <LineProgress
      percent={isLoading || isLoadingAnswer ? 40 : 100}
      autoIncrement
      spinner={false}
    />
  )
}

function mapStateToProps (state) {
  return {
    isLoading: state.AppState.isLoading,
    isLoadingAnswer: state.AppState.isLoadingAnswer
  }
}

module.exports = connect(mapStateToProps)(ProgressBar)
