#### Usage

```js
const result = {
  title: 'This is a title'
};
<Title
  result={result}
/>
```

With highlighting

```js
const result = {
  title: 'This is a title',
  highlighting: {
    title: 'This is a <span class="ola-highlight">title</span>'
  }
};
<Title
  result={result}
/>
```