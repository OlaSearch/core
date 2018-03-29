#### Usage

```js
const card = {
  title: 'Result title',
  template: 'carousel',
  subtitle: 'Result subtitle',
  images: [
    {
      src: 'https://placeimg.com/640/480/animal',
      url: 'https://placeimg.com/640/480/any',
      title: 'Random image title',
    },
    {
      src: 'https://placeimg.com/640/480/monkey',
      url: 'https://placeimg.com/640/480/any',
      title: 'Random image title',
    },
    {
      src: 'https://placeimg.com/640/480/people',
      title: 'Random image title',
    },
    {
      src: 'https://placeimg.com/640/480/people',
      title: 'Random image title',
    },
    {
      src: 'https://placeimg.com/640/480/me',
      title: 'Random image title',
    },{
      src: 'https://placeimg.com/640/480/building',
      title: 'Random image title',
    }
  ],
  buttons: [
    {
      title: 'View webpage',
      type: 'web_url',
      url: '//olasearch.com'
    }
  ]
};
<AnswerCarousel
  card={card}  
/>
```
