#### Usage

```js
const card = {
  "template": "line_chart",
  "title": "GDP growth (%)",
  "record_data": [
      {
          "2011": 6.6,
          "2012": 5.5,
          "2013": 6.5,
          "2014": 7.2,
          "2015": 7.9,
          "2016": 7.1,
          "2017": "7.4<sup>f</sup>",
          "2018": "7.6<sup>f</sup>",
          "Country": "India"
      }
  ],
  "record_keys": [
      "Country",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018"
  ],
  "footnote": "<sup>f</sup> denotes forecasted number.",
  "source": {
      "name": "Asian Development Outlook 2016 Update: Meeting the Low-Carbon Growth Challenge",
      "url": "https://www.adb.org/publications/asian-development-outlook-2016-update"
  }
};
<AnswerLineChart
  card={card}  
/>
```
