#### Usage

```js
const facet = {
  name: 'boolean',
  values: ['yes', 'no'],
  displayName: 'Shipping',
  template: 'Free shipping'
};
const dispatch = () => {};
<BooleanFilter
  facet={facet}
  selected={['yes']}
  dispatch={dispatch}
/>
```