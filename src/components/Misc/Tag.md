#### Usage

```js
const facet = {
  name: 'category',
  displayName: 'Category'
};
<Tag
  name='Politics'
  facet={facet}
/>
```

For dates

```js
const facet = {
  name: 'event_date',
  displayName: 'Event date',
  type: 'daterange',
  template: '{from} to {to}',
  format: 'DD MMM YYYY'
};
<Tag
  name={['2018-03-15T06:41:41.752Z', '2019-03-15T06:41:41.752Z']}
  facet={facet}
/>
```