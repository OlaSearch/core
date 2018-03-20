#### Usage

```js
const App = WithLogger(({ log }) => <div>Log is a <em>{typeof log}</em></div>);
<App />
```

### Variables that are being logged

| Variable | Description |
| ---- | ---- |
| userid | User id of the logged in user |
| username | User name of the logged in user |
| history | Array of previous queries |
| bookmarks | Bookmarked results |
| query | Active query |
| page | Current page |
| perPage | No of results shown per page |
| searchLocation | Browser location path |
| searchReferrer | Origin page of the search request |
| eventType | Type of the event. One of  `Q` - Query,  `C` - Click,  `O` - Others |
| totalResults | Total results displayed |
| screenwh | Screen resolution of users device |
| devicePixelRatio | Device pixel ratio |
| clientwh | Browser height and width |
| env | Ola environment, One of staging or production |
| queryTimestamp | Timestamp for when the query was made |
| resultId | ID of the result clicked |
| resultsDisplayed | Array of result ids that are displayed for a query: Used to find impressions |
| position | Position of the search result clicked |
| title | Title of the result clicked |
| url | URL of the result clicked |
| error | Error message |
| geo | True or False if location is turned on |
| search_session | Active search session - Unique for one session. Get destroyed if user closes browser tab |
| user_session | Active user session |
| device | One of `Phone`, `Tablet` or `Desktop` |
| searchInput | How the search was made. One of `keyboard`, `voice`, `url`, `autosuggest`, `suggest`
| eventCategory | Category of the event |
| eventAction | Event action |
| eventLabel | Label of the event |
| language | Language of the project |
| newUser | Boolean to indicate if the user is new or returning |
| userAgent | Navigator user agent |
| snippetId | ID of the snippet clicked |
| filter_sequence | sequence of filter groups |
| filter_term_sequence | sequence of filter terms along with filter group |
| intent | One of `true` or `false`. Boolean to indicate if intent is active
| intentModule | Current active intent |
| confidence | Intent confidence |
| sentiment | positive, negative, neutral |
| sentiment_confidence | Between 0 and 1 |
| bot | To identify bot |
| in_response_to | Query was in response to this message ID |
| in_response_to_text | In response to message text |
| channel | One of `bot` or `search`
