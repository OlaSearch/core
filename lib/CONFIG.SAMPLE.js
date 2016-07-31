'use strict';

module.exports = {
  array_separator: null,
  infiniteScroll: false,
  showEmptyFacet: false,
  facetSearchLimit: 5,
  searchTimeOut: 0,
  autoSuggestTimeout: 100,
  mediaQuery: {
    mobile: 'screen and (max-width: 600px)',
    tablet: 'screen and (min-width: 768px)',
    desktop: 'screen and (min-width: 960px)'
  },
  method: 'GET',
  jsonp: true,
  enableDetailPage: true,
  api: {
    search: 'http://52.76.48.148:8983/solr/rt/select',
    suggest: 'http://52.76.48.148:8983/solr/rt/autosuggest'
  },
  history: 'pushState',
  ajaxOptions: {
    method: 'post',
    type: 'json',
    crossOrigin: true,
    headers: {}
  },
  logger: {
    enabled: process.env.OLA_ENV === 'production',
    engine: ['google', 'logstash'],
    url: '/log',
    headers: {
      // 'Authorization': 'Basic b2xhOm9sYTIwMTY='
    }
  },
  searchPageUrl: 'search.html',
  mapping: [{
    name: 'q',
    key: 'q',
    value: ''
  }, {
    name: 'page',
    key: 'start',
    value: 1
  }, {
    name: 'per_page',
    key: 'rows',
    value: 10,
    hidden: true
  }, {
    name: 'facet_field',
    key: 'facet.field',
    value: [],
    hidden: true
  }, {
    name: 'facet_query',
    key: 'fq',
    value: []
  }, {
    name: 'output',
    key: 'wt',
    value: 'json',
    hidden: true
  }, {
    name: 'highlight',
    key: 'highlight',
    value: 'true'
  }, {
    name: 'highlight_fields',
    key: 'highlight_fields',
    value: ['title_t', 'description_t'],
    matched_fields: [['title_t', 'title_t.word', 'title_t.ngram'], []],
    pre_tags: ['<em class=\'ola-highlight\'>'],
    post_tags: ['</em>']
  }],
  mappingAutoSuggest: [{
    name: 'q',
    key: 'q',
    value: ''
  }, {
    name: 'page',
    key: 'start',
    value: 1
  }, {
    name: 'per_page',
    key: 'rows',
    value: 10,
    hidden: true
  }, {
    name: 'highlight',
    key: 'highlight',
    value: 'true'
  }, {
    name: 'highlight_fields',
    key: 'highlight_fields',
    value: ['title_t', 'description_t'],
    matched_fields: [['title_t', 'title_t.word', 'title_t.ngram'], []],
    pre_tags: ['<em class=\'ola-highlight\'>'],
    post_tags: ['</em>']
  }],
  facetsToDisplay: {
    '*': ['genres_sm', 'cast_sm', 'mpaa_rating_s', 'year_i', 'runtime_i', 'audience_score_i']
  },
  tabsToDisplay: ['Unrated', 'R', 'PG', 'PG-13'],
  nullFacetName: 'Uncategorised',
  facets: [],
  sortBy: [{
    name: 'Title A-Z',
    value: 'title_s asc'
  }],
  perPage: ['10', '20', '50', '100']
};