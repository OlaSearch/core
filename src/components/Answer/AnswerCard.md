#### Usage

```js
const card = {
  title: 'Result title',
  subtitle: 'Result subtitle',
  image: 'https://placeimg.com/640/480/any'
};
<AnswerCard
  card={card}  
/>
```

With buttons
```js
const card = {
  title: 'Result title',
  subtitle: 'Result subtitle',
  image: 'https://placeimg.com/640/480/any',
  buttons: [
    {
      title: 'View webpage',
      type: 'web_url',
      url: '//olasearch.com'
    }
  ]
};
<AnswerCard
  card={card}  
/>
```

With source
```js
const card = {
  title: 'Result title',
  subtitle: 'Result subtitle',
  image: 'https://placeimg.com/640/480/any',
  buttons: [
    {
      title: 'View webpage',
      type: 'web_url',
      url: '//olasearch.com'
    }
  ],
  source: {
    name: 'CIA Fact Sheet',
    url: '//olasearch.com'
  }
};
<AnswerCard
  card={card}  
/>
```