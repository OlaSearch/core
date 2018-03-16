#### Usage

Basic Text field

```js
const result= {
  title: 'Result title',
  summary: 'Summary of the result'
};
<TextField
  result={result}
  field='summary'
/>
```

Text field with highlighting

```js
const result= {
  title: 'Result title',
  summary: 'Summary of the result',
  highlighting: {
    summary: 'Summary of <span class="ola-highlight">the</span> result'
  }
};
<TextField
  result={result}
  field='summary'
/>
```