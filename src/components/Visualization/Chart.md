#### Usage

Line chart
```js
const data = [
  ["data1", 30, 200, 100, 400, 150, 250],
  ["x", 1, 2, 3, 4, 5, 6]
];
<Chart data={data} />
```

Bar chart

```js
const data = [
  ["data1", 30, 200, 100, 400, 150, 250],
  ["x", 1, 2, 3, 4, 5, 6]
];
<Chart data={data} type='bar' />
```

Spline chart

```js
const data = [
  ["data1", 30, 200, 100, 400, 150, 250],
  ["x", 1, 2, 3, 4, 5, 6]
];
<Chart data={data} type='spline' />
```

Step chart

```js
const data = [
  ["data1", 30, 200, 100, 400, 150, 250],
  ["x", 1, 2, 3, 4, 5, 6]
];
<Chart data={data} type='step' />
```

Bubble chart

```js
const data = [
  ["data1", 30, 350, 200, 380, 150, 250, 50, 80, 55, 220],
  ["data2", 130, 100, 10, 200, 80, 50, 200, 123, 185, 98],
  ["data3", 230, 153, 85, 300, 250, 120, 5, 84, 99, 289]
];
<Chart x={null} data={data} type='bubble' />
```


Pie chart

```js
const data = [
  ["data1", 30],
  ["data2", 120],
  ["x", 0]
];
<Chart data={data} type='pie' />
```

Donut chart

```js
const data = [
  ["data1", 30],
  ["data2", 120],
  ["x", 0]
];
<Chart data={data} type='donut' />
```

Gauge chart

```js
const data = [
  ["data1", 30],
  ["x", 0]
];
<Chart data={data} type='gauge' />
```

Area chart

```js
const data = [
  ["data1", 30, 200, 100, 400, 150, 250],
  ["x", 1, 2, 3, 4, 5, 6]
];
<Chart
  data={data}
  types={{
    'data1': 'area'
  }}
/>
```
