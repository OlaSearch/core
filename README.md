# OlaSearch
OlaSearch is a fully customisable front-end search interface that brings your information collection to life.

[![build status](https://gitlab.com/olasearch/olasearch-core/badges/master/build.svg)](https://gitlab.com/olasearch/olasearch-core/commits/master)

Pre-requisites: [https://yarnpkg.com](Yarn) package manager and Node 6+

## Installation

### 1. Install olasearch core

```
yarn add @olasearch/core
```

### 2. Download configurations
Download the configurations from [https://admin.olasearch.com](https://admin.olasearch.com)

1. Login to [https://admin.olasearch.com](https://admin.olasearch.com)
2. Navigate to Project -> Settings
3. Copy the Configuration file URL and Open the URL in a new window
4. Save the file as `olasearch.config.js`

### 3. Download OlaSearch starter kit

```
git clone https://gitlab.com/olasearch/olasearch-project-starter.git
cd olasearch-project-starter
yarn install
```

### Initialize Ola Search

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter';
import { createStore, OlaProvider } from '@olasearch/core'
import Search from '@olasearch/core/lib/containers/Search'

/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http })

ReactDOM.render(
  <OlaProvider config={config} store={store}>
    <Search />
  </OlaProvider>
  , document.getElementById('root')
);
```



## Collaboration guidelines

Uses [Prettier](prettier.io) and [Prettier standard](https://github.com/sheerun/prettier-standard) for code formatting and linting

Always run

````
npm run prettier-standard
````

And fix any JS style issues before committing files


## License

Copyright OlaSearch Pte Ltd 2015 - 2018
