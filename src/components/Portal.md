#### Usage

```js
initialState = { isOpen: false };
<div>
  <button onClick={() => setState({ isOpen: true })}>Open modal</button>
  <Portal
    isOpen={state.isOpen}
    onRequestClose={() => setState({ isOpen: false })}
  >
    <p>Portal content</p>
  </Portal>
</div>
```