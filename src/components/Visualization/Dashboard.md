#### Usage

````
const data = [
  {
    title: 'Alcohol by volume',
    fields: [
      {
        name: 'abv_f',        
      }
    ],
    limit: 5,
    type: 'line'
  },
  {
    title: 'Bitterness',
    fields: [
      {
        name: 'ibu_f',        
      }
    ],
    limit: 5,
    type: 'bar'
  }
];
<Dashboard dashboard={data} />
````