#### Usage

```js
initialState = { text: 'Anything within {curly_bracket} gets highlighted' };
const reg = new RegExp(/\{([^ ]*?)\}/gi);
<ContentEditable
  placeholder="Enter a value"
  value={state.text}
  onChange={(event) => {
    setState({
      text: event.target.value
    })
  }}
  formatValue={(value) => value.replace(reg, (match, text) => `<span class='ola-input-tag'>{${text}}</span>`)}
/>
```