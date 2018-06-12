#### Usage

```js
initialState = { isOpen: false };
<div>
  <button onClick={() => setState({ isOpen: true })}>Open modal</button>
  <Portal
    isOpen={state.isOpen}
    onRequestClose={() => setState({ isOpen: false })}
  >
    <div style={{background:'white', padding: '2rem'}}>
      <p>Portal content</p>
    </div>
  </Portal>
</div>
```