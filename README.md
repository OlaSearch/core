# Ola Search Core
Ola Search Core is a fully customisable front-end search interface that brings your information collection to life.

[![build status](https://gitlab.com/olasearch/olasearch-core/badges/master/build.svg)](https://gitlab.com/olasearch/olasearch-core/commits/master)

Pre-requisites: [https://yarnpkg.com](Yarn) package manager and Node 6+

## Installation

### 1. Install olasearch core
```
yarn add @olasearch/core
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
yarn install
cd src
# Copy the config file to `src` directory
yarn start
```

Navigate to `http://localhost:3003` to see a search interface

## Collaboration guidelines

Uses [Prettier](prettier.io) and [Prettier standard](https://github.com/sheerun/prettier-standard) for code formatting and linting

## License

Copyright OlaSearch Pte Ltd 2015 - 2018
