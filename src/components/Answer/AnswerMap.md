#### Usage

```js
const card = {
  "template": "map",
  "title": "Map of 49 award winners.",
  "elements": [
      {
          "location": "-27.4756124,153.0280484",
          "title": "Queensland University of Technology, Australia"
      },
      {
          "location": "50.7231963,-1.9063363",
          "title": "Liverpool Victoria, UK"
      }
  ]
};
<AnswerMap
  card={card}  
/>
```

With results from search engine

```js
const card = {
  "template": "map",
  "title": "Map of 49 award winners.",
  "element_keys": {
      "location": "ola_location",
      "title": "schema_org_name_t"
  },
  source: 'results'
};
const results = [
  {
      "ola_location": "-27.4756124,153.0280484",
      "schema_org_name_t": "Queensland University of Technology, Australia"
  },
  {
      "ola_location": "50.7231963,-1.9063363",
      "schema_org_name_t": "Liverpool Victoria, UK"
  }
];
<AnswerMap
  card={card}
  results={results}
/>