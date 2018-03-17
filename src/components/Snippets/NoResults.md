#### Usage

```js
<NoResults
  totalResults={0}
  q='Hello'
/>
```

If the query term is spell corrected

```js
<NoResults
  totalResults={0}
  q='Hell'
  suggestedTerm='Hello'
/>
```

If too restrictive facets are selected

```js
const facets = [
  {
    name: 'category',
    selected: ['news']
  }
];
<NoResults
  totalResults={0}
  q='Hell'
  facets={facets}
  suggestedTerm='Hello'
/>
```