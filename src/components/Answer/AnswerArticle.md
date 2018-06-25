#### Usage

With full info

```js

const card = {
    "template": "article",
    "url": "https://olasearch.com/articles/search-technology-more-than-just-a-search-engine",
    "image": "https://www.impossible.sg/wp-content/uploads/2018/04/Top-5-search-engine-alternatives-to-consider-beside-Google-and-Yahoo.jpg",
    "title": "Search experience.",
    "author": [
        {"name": "Maish Nichani", "url": "https://twitter.com/maish?lang=en"},
        {"name": "Viswanath Parameswaran", "url": "https://www.zoominfo.com/p/Viswanath-Parameswaran/699670463"}
        ],
    "date_published": "04 January 2017",
    "subtitle": "Search technology includes taxonomy management, text analytics, search analytics and more.",
    "content": "Search technology includes taxonomy management, text analytics, search analytics and more. These related technologies add meaning and intelligence and make the search experience more efficient and enjoyable.",
    "related": [
        {
            title: 'Search experience: Selecting the right technologies',
            url: 'https://olasearch.com/articles/search-technology-more-than-just-a-search-engine'
        },
        {
            title: 'Search experience: Defining search goals',
            url: 'https://olasearch.com/articles/defining-search-goals'
        }
    ],
    "buttons": [],
};

<AnswerArticle
    card={card}
    />
```

With missing infos

```js

const card = {
    "template": "article",
    "url": "https://olasearch.com/articles/search-technology-more-than-just-a-search-engine",
    "image": "",
    "title": "Search experience.",
    "author": [],
    "date_published": "04 January 2017",
    "short_desc": "Search technology includes taxonomy management, text analytics, search analytics and more.",
    "content": "Search technology includes taxonomy management, text analytics, search analytics and more. These related technologies add meaning and intelligence and make the search experience more efficient and enjoyable.",
    "related": [],
    "buttons": [],
};

<AnswerArticle
    card={card}
    />
```
