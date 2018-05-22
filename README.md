# Ola Search Core
Ola Search Core is a fully customisable front-end search interface that brings your information collection to life.

[![npm package](https://img.shields.io/npm/v/@olasearch/core.svg)](https://www.npmjs.com/package/@olasearch/core)
[![npm download](https://img.shields.io/npm/dm/@olasearch/core.svg)](https://www.npmjs.org/package/@olasearch/core)
[![Travis](https://travis-ci.org/OlaSearch/core.svg?branch=master)](https://travis-ci.org/OlaSearch/core)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![PeerDependencies](https://img.shields.io/david/peer/OlaSearch/core.svg)](https://david-dm.org/OlaSearch/core#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/OlaSearch/core.svg)](https://david-dm.org/OlaSearch/core)
[![DevDependencies](https://img.shields.io/david/dev/OlaSearch/core.svg)](https://david-dm.org/OlaSearch/core#info=devDependencies&view=list)

## Installation

### 1. Install olasearch core
```
npm install @olasearch/core --save
```

### 2. Download configurations
Download the configurations from [https://admin.olasearch.com](https://admin.olasearch.com) . The configuration files contain settings for the project, filters, snippets, relevancy boosting etc.

1. Login to [https://admin.olasearch.com](https://admin.olasearch.com)
2. Navigate to Project -> Settings
3. Download the configuration files.
4. Save the file as `olasearch.config.js`

### 3. Download OlaSearch starter kit

```
git clone https://gitlab.com/olasearch/olasearch-project-starter.git
cd olasearch-project-starter
npm install
cd src
# Copy the config file to `src` directory
npm run start
```

Navigate to `http://localhost:3003` to see a search interface

### More documentation - Coming Soon

## Collaboration guidelines

Uses [Prettier](prettier.io) and [Prettier standard](https://github.com/sheerun/prettier-standard) for code formatting and linting

## Naming convention for Props

Reference - https://dlinau.wordpress.com/2016/02/22/how-to-name-props-for-react-components/

````
1. Array – use plural nouns. e.g. items
2. Number – use prefix num or postfix count, index etc that can imply a number. e.g. numItems, itemCount, itemIndex
3. Bool – use prefix is, can, has
    1. is: for visual/behavior variations. e.g. isVisible, isEnable, isActive
    2. can: fore behavior variations or conditional visual variations. e.g. canToggle, canExpand, canHaveCancelButton
    3. has: for toggling UI elements. e.g. hasCancelButton, hasHeader
4. Object – use noun. e.g. item
5. Node – use prefix node. containerNode
6. Element – use prefix element. hoverElement
````

## License

Copyright OlaSearch Pte Ltd 2015 - 2018
