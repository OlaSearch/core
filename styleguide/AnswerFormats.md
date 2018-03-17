Show instant answers such as charts, numbers, entities right in the query suggestions

### Answer formats

We support the following answer cards. The list will keep growing.

#### Card

```json
{
  "card": {
    "template": "generic",
    "title": 1986,
    "subtitle": "ADB commenced operations in India in 1986.",
    "url": "",
    "buttons": [
      {
        "title": "View Webpage",
        "type": "web_url",
        "url": ""
      }
    ],
    "source": {
      "name": "ADB Fact Sheet",
      "url": "https://www.adb.org/publications/india-fact-sheet"
    }
  }
}
```

#### List

```json
{
  "card": {
    "template": "list",
    "title": "Media Contact",
    "elements": [
      {
        "buttons": [],
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
  }
}
```

#### Line chart

```json
{
  "card": {
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
  }
}
```

#### Map

```json
{
  "card": {
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
  }
}
```

#### Map from search results


```json
{
  "card": {
    "template": "map",
    "title": "Map of events near me",
    "source": "results",
    "element_keys": {
      "location": "ola_location",
      "title": "schema_org_name_t"
    }
  }
}
```


#### Word map

```json
{
  "card": {
    "template": "wordmap",
    "title": "Showing 78 topics.",
    "elements": [
      {
        "count": 27,
        "title": "User experience"
      },
      {
        "count": 21,
        "title": "SharePoint"
      },
      {
        "count": 18,
        "title": "Dashboards"
      }
    ]
  }
}
```