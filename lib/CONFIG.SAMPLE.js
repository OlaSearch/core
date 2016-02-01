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
		value: ['{!ex=genr}genres_sm', '{!ex=mpaa}mpaa_rating_s', '{!ex=runt}runtime_i', '{!ex=year}year_i', 'cast_sm'],
		hidden: true
	}, {
		name: 'facet_query',
		key: 'fq',
		value: []
	}, {
		name: 'field_query',
		key: 'fl',
		value: '',
		hidden: true
	}, {
		name: 'facet_limit',
		key: 'facet.limit',
		value: 500,
		hidden: true
	}, {
		name: 'spellcheck_collate',
		key: 'spellcheck.collate',
		value: true,
		hidden: true
	}, {
		name: 'output',
		key: 'wt',
		value: 'json',
		hidden: true
	}, {
		name: 'facet',
		key: 'facet',
		value: true,
		hidden: true
	}, {
		name: 'sort',
		key: 'sort',
		value: ''
	}, {
		name: 'header',
		key: 'omitHeader',
		value: 'false',
		hidden: true
	}, {
		name: 'stats',
		key: 'stats',
		value: 'true',
		hidden: true
	}, {
		name: 'stats_field',
		key: 'stats.field',
		value: ['runtime_i', 'year_i'],
		hidden: true
	}, {
		name: 'field_facet_missing',
		key: 'f.genres_sm.facet.missing',
		value: 'false',
		hidden: true
	}, {
		name: 'facet_range',
		key: 'facet.range',
		value: ['{!ex=audi}audience_score_i'],
		hidden: true
	}, {
		name: 'facet.mincount',
		key: 'facet.mincount',
		value: '1',
		hidden: true
	}, {
		name: 'rating_facet_range_start',
		key: 'f.audience_score_i.facet.range.start',
		value: "0",
		hidden: true
	}, {
		name: 'rating_facet_range_end',
		key: 'f.audience_score_i.facet.range.end',
		value: "100",
		hidden: true
	}, {
		name: 'rating_facet_range_gap',
		key: 'f.audience_score_i.facet.range.gap',
		value: "20",
		hidden: true
	}, {
		name: 'rating_facet_range_include',
		key: 'f.audience_score_i.facet.range.include',
		value: "all",
		hidden: true
	}, {
		name: 'highlight',
		key: 'hl',
		value: "true"
	}, {
		name: 'highlight_fields',
		key: 'hl.fl',
		value: "title_t"
	}, {
		name: 'highlight_pre',
		key: 'hl.simple.pre',
		value: '<em class="ola-highlight">'
	}, {
		name: 'highlight_fragsize',
		key: 'hl.fragsize',
		value: '200'
	}, {
		name: 'highlight_phrase',
		key: 'hl.usePhraseHighlighter',
		value: 'true'
	}, {
		name: 'highlight_multiterm',
		key: 'hl.highlightMultiTerm',
		value: 'true'
	}, {
		name: 'highlight_fastVector',
		key: 'hl.useFastVectorHighlighter',
		value: 'true'
	}, {
		name: 'timestamp',
		key: 'timestamp',
		value: ''
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
		name: 'field_query',
		key: 'fl',
		value: ['id', 'poster_s', 'audience_score_i', 'title_t', 'year_i', 'thumbnail_s', 'thumbnail_mobile_s', 'directors_tm', 'link_s']
	}, {
		name: 'header',
		key: 'omitHeader',
		value: 'false',
		hidden: true
	}, {
		name: 'highlight',
		key: 'hl',
		value: "true"
	}, {
		name: 'highlight_fields',
		key: 'hl.fl',
		value: "title_t"
	}, {
		name: 'highlight_pre',
		key: 'hl.simple.pre',
		value: '<em class="ola-highlight">'
	}, {
		name: 'highlight_fragsize',
		key: 'hl.fragsize',
		value: '200'
	}, {
		name: 'highlight_phrase',
		key: 'hl.usePhraseHighlighter',
		value: 'true'
	}, {
		name: 'highlight_multiterm',
		key: 'hl.highlightMultiTerm',
		value: 'true'
	}, {
		name: 'highlight_fastVector',
		key: 'hl.useFastVectorHighlighter',
		value: 'true'
	}],
	fieldMappings: {
		id: 'id',
		title: 'title_t',
		summary: 'synopsis_t',
		url: 'link_s',
		year: 'year_i',
		genres: 'genres_sm',
		rating: 'mpaa_rating_s',
		runtime: 'runtime_i',
		release_date: 'release_date_theatre_tdt',
		critics_rating: 'critics_rating_s',
		critics_score: 'critics_score_i',
		audience_rating: 'audience_rating_s',
		audience_score: 'audience_score_i',
		star_rating: 'audience_score_i',
		poster: 'poster_s',
		thumbnail: 'thumbnail_s',
		thumbnail_mobile: 'thumbnail_mobile_s',
		cast: 'cast_tm',
		directors: 'directors_tm',
		studio: 'studio_s'
	},
	facetsToDisplay: {
		'*': ['genres_sm', 'cast_sm', 'mpaa_rating_s', 'year_i', 'runtime_i', 'audience_score_i']
	},
	tabsToDisplay: ['Unrated', 'R', 'PG', 'PG-13'],
	nullFacetName: 'Uncategorised',
	facets: [{
		name: 'genres_sm',
		displayName: 'Genre',
		type: 'string',
		question: 'Select genre',
		questionType: 'select2|radio|checkboxes',
		defaultValue: 'Drama',
		fieldType: 'select'
	}, {
		name: 'cast_sm',
		displayName: 'Cast',
		type: 'string',
		question: 'Select actors'
	}, {
		name: 'mpaa_rating_s',
		displayName: 'MPAA Rating',
		type: 'checkbox',
		multiSelect: true
	}, {
		name: 'year_i',
		displayName: 'Year',
		type: 'range',
		fieldType: 'select',
		condition: 'OR',
		multiSelect: true,
		template: '{from} to {to}',
		singleHandle: false
	}, {
		name: 'runtime_i',
		displayName: 'Runtime (in minutes)',
		type: 'range',
		multiSelect: true,
		template: 'Between {from} to {to} mins'
	}, {
		name: 'audience_score_i',
		displayName: 'Rating',
		type: 'rating',
		multiSelect: true,
		start: 0,
		end: 100,
		gap: 20,
		label: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
		template: '{from} to {to}'
	}],
	sortBy: [{
		name: 'Title A-Z',
		value: 'title_s asc'
	}, {
		name: 'Title Z-A',
		value: 'title_s desc'
	}, {
		name: 'Latest first',
		value: 'year_i desc'
	}, {
		name: 'Oldest first',
		value: 'year_i asc'
	}, {
		name: 'Rating high-low',
		value: 'audience_score_i desc'
	}],
	perPage: ['10', '20', '50', '100']
};