#### Usage

```js
const card = {
  "template": "list",
  "title": "Media Contact",
  "elements": [
    {
      "buttons": [
        {
          title: "Send email",
          type: 'email',
          url: 'vinay@olasearch.com'
        }
      ],
      "fields": [
        {
          "label": "Topic",
          "value": "Development Effectiveness and Results"
        },
        {
          "label": "Website",
          "value": "https://www.adb.org/site/development-effectiveness/contacts"
        }
      ],
      "subtitle": null,
      "title": "Planning and Results Management contacts"
    }
  ],
  "source": {
    "name": "Media Contacts",
    "url": "https://www.adb.org/news/contacts"
  }
};
<AnswerList
  card={card}  
/>
```
