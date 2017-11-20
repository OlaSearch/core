import React from 'react'

export default class ContentEditable extends React.Component {
  constructor (props) {
    super (props)
  }
  static defaultProps = {
    formatValue: null,
    onChange: null,
    onSubmit: null,
  };
  emitChange = (event) => {
    if (!this.el) return;
    let text = this.el.textContent;
    if (this.props.onChange && text !== this.lastText) {
      this.props.onChange(text);
    }
    this.lastText = text;
    this.updateFakeEl(text)
  };
  updateFakeEl = (text) => {
    this.fakeEl.innerHTML = this.props.formatValue ? this.props.formatValue(text) : text
  };
  componentDidUpdate () {
    if ( this.el && this.props.value !== this.el.textContent ) {
      this.el.textContent = this.props.value
    }
    this.updateFakeEl(this.el.textContent)
  }
  componentDidMount () {
    this.updateFakeEl(this.el.textContent)
  }
  shouldComponentUpdate (nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      !this.el
      // ...or if html really changed... (programmatically, not by user edit)
      || ( nextProps.value !== this.el.textContent
        && nextProps.value !== this.props.value )
      // ...or if editing is enabled or disabled.
      || this.props.disabled !== nextProps.disabled
      // ...or if className changed
      || this.props.className !== nextProps.className
    );
  }
  registerRef = (el) => {
    this.el = el
  };
  registerFakeRef = (el) => {
    this.fakeEl = el
  };
  createMarkup = () => {
    return { __html: this.props.value };
  };
  onKeyDown = (evt) => {
    if (evt.which === 13) {
      evt.preventDefault()
      this.props.onSubmit && this.props.onSubmit(this.props.value)
    }
  };
  render () {
    let { formatValue, value, ...rest } = this.props

    return (
      <div className='ContentEditableWrapper'>
        <div
          {...rest}
          ref={this.registerRef}
          contentEditable
          onInput={this.emitChange}
          dangerouslySetInnerHTML={this.createMarkup()}
          onKeyDown={this.onKeyDown}
          className='ContentEditable-Input'
        />
        <div
          ref={this.registerFakeRef}
          contentEditable
          readOnly
          className='ContentEditable-Fake'
          tabIndex={-1}
        />
      </div>
    )
  }
}