#### Usage 

You may use the `onClick` handler to invoke a modal dialog to view a single page

```html
import { Fields } from '@olasearch/core'
const { DocumentPages } = Fields
```

```js
const pages = [
  {
    pageContent: 'Content for page 1',
    pageNumber: 1
  },
  {
    pageContent: 'Content for page 2',
    pageNumber: 2
  }
];
const result = {
  id: 2,
  title: 'This is a document with 2 pages'
};
<DocumentPages
  pages={pages}
  result={result}
  onClick={(page, result) => {
    console.log(page, result)
  }}
/>
```