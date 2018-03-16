#### Usage 

```html
import { Fields } from '@olasearch/core'
const { Directions } = Fields
```

```js
const result = {ola_location: '1.2819346999999999,103.8447636', 'ola_distance': 20};
<Directions
  result={result}
  locationName='San Fransisco, LA'
  displayIcon
/>
```