import React from 'react'

/**
 * onSubmit=>
 * var data = new FormData(event.target)
 * var feedback = data.get('ola_escalation_feedback')
 */

const EscalationForm = (props) => {
  let { label, placeholder, buttonLabel, formUrl, visible, onSubmit, children } = props
  if (!visible) return null
  return (
    <form className='ola-escalation-form' action={formUrl} onSubmit={onSubmit}>
      <p>{label}</p>
      {children ||
        (<div>
          <textarea placeholder={placeholder} rows='2' cols='10' name='ola_escalation_feedback' />
          <button>{buttonLabel}</button>
          </div>
        )
      }
    </form>
  )
}

EscalationForm.defaultProps = {
  label: 'We\'re sorry we don\'t have an answer to your query. Please use the following options to reach out to our customer service officers.',
  placeholder: 'Please describe what you are looking so we can assist you quickly',
  buttonLabel: 'Submit'
}

module.exports = EscalationForm
