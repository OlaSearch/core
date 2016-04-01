# OlaSearch
OlaSearch is a fully customisable front-end search interface that brings your information collection to life

## Todo

- [x] Search history
- [x] i18n Translations - React-intl
- [x] Contextual Information - Send Device data and Location data to Solr. Add Device State
- [x] URL Routing with _.debounce
- [x] Guide tooltips
- [x] Visualizations should respect Range boundaries for Rating/Range inputs
- [x] Voice Search - Only supported in Chrome desktop
- [x] Selected facets should be Immutable (It is immutable. ShouldComponentUpdate will work, but there is no multiple renders, hence no performance loss)
- [x] Tests
- [x] Move Adapters and HTTP services to NPM packages
- [x] Move components to config file
- [x] Improve rendering speed even when the facet size is very high 10,000+ (Using shouldComponentUpdate on SearchResults)
- [x] Added tag cloud

## Coding collaboration guidelines

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Please use Javascript Standard Guide [https://github.com/feross/standard](https://github.com/feross/standard)
Please use eslint guidelines in `.eslintrc`

Always run

````
npm run standard
npm run lint
````

And fixing any JS style issues before committing files

## Features

### Search

1. Framework agnostic - OlaSearch is Javascript based, hence can run on any back-end languages
2. Works with Solr, Elastic Search, Sharepoint
3. Server-side rendering using Node

### Components

1. Guided Search - a step-by-step way to introduce faceting
2. AutoSuggest
3. Faceting
4. Search Snippet Customization
5. Spell Suggestions
5. Range, Checkbox, Star rating, Tabs for Facets
6. Visualization
7. Sort results based on relevancy and fields
8. Speech Input
9. Bookmark search results
10. Store and Save search history and query
11. Show different sets of facets based on user-selection
12. Share search results via E-mail or to other social networks
13. Infinite scroll with Load more
14. Highlighting results

## Javascript stack

1. React 0.14 with ES6 and webpack
2. Redux
3. React-intl for translations and formatting


## Packaging/Bundling

1. Core Files
	- Services	
	- Actions
	- Reducers
	- Middleware
	- React
	- ReactDOM
	- Decorators

2. Components
	- All components

## Sending logs

Sending logs are handled by the Search adapter. To enable logging, add the below to the config file

````
logger: {
    enabled: true,
    url: 'http://54.169.244.143:8080/',
    headers: {
        "Authorization": "Basic b2xhOm9sYTIwMTY="
    }
},
````


## Polyfills

1. - Event
2. - CustomEvent
3. Element.prototype.classList
4. Object.assign
5. requestAnimationFrame
6. ~html5-elements

## License

Copyright OlaSearch Pte Ltd 2015
