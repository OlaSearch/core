#### Usage 

```html
import { Fields } from '@olasearch/core'
const { DateField } = Fields
```

```js
<DateField date='2017-11-01' format='DD/MM/YYYY' fieldLabel='Start date' />
```

With icon

```js
<DateField displayIcon date='2017-11-01' format='DD/MM/YYYY' fieldLabel='Start date' />
```

With multiple dates

```js
<DateField
  date='2018-03-15T06:41:41.752Z'
  endDate='2018-03-16T08:41:41.752Z'
  format='DD MMMM YYYY'
  fieldLabel='Start date'
  displayIcon
/>
```

End date on the same day as start date

```js
<DateField
  date='2018-03-15T06:41:41.752Z'
  endDate='2018-03-15T08:41:41.752Z'
  format='DD MMMM YYYY hh:mm a'
  fieldLabel='Event date'
  displayIcon
/>
```