#### Usage 

```html
import { Fields } from '@olasearch/core'
const { DateField } = Fields
```

```js
<DateField date='2017-11-01' format='DD/MM/YYYY' fieldLabel='Start date' />
```

With multiple dates

```js
<DateField
  date='2017-11-01'
  endDate='2017-11-02'
  format='DD/MM/YYYY'
  fieldLabel='Start date'
/>
```