import React from 'react'
import { connect } from 'react-redux'

function VoiceHelp ({ hasUsedVoice, onDismiss }) {
  if (hasUsedVoice) return null
  return (
    <div className='ola-onboarding'>
      <div className='ola-onboarding-overlay' onClick={onDismiss} />
      <div className='ola-onboarding-content'>
        <p>
          Hi there, you can use your voice to explore this collection.
        </p>
        <p>Tap the button and ask <strong> "What can i do"</strong> to get started</p>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    hasUsedVoice: state.Context.hasUsedVoice
  }
}

module.exports = connect(mapStateToProps)(VoiceHelp)
