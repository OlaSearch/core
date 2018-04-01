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

## License

Copyright OlaSearch Pte Ltd 2015 - 2018
