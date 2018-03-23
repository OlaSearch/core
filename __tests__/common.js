export const MAKE_ACTION = (type, args) => {
  return {
    type,
    ...args
  }
}

export const INIT_TYPE = {
  type: 'REDUX/INIT'
}

export const FACET_ITEM_AUTOSUGGEST = {
  facet: {
    name: 'genres_sm',
    displayName: 'Genre',
    type: 'string',
  },
  value: 'Drama'
}

export const MAKE_FILTER_ITEM = (name) => ({
  name: `${name}`,
  type: 'field',
  field: '_type',
  selected: ['doc'],
  multiSelect: true
})


const MOCK_RESULTS = {
  results: []
}

export const MOCK_SEARCH_ADAPTER = {
  Parser () {
  },
  QueryBuilder () {
    return {
      transform: () => {

      }
    }
  },
  Http () {
    return {
      search: function (){
        return new Promise((resolve, reject) => 
          resolve({
            responseText: JSON.stringify(MOCK_RESULTS)
          })
        )
      }
    }
  }
}

export const MOCK_CONFIG = {
  proxy: true
}

export function decodeCookie (obj) {
  return JSON.parse(decodeURIComponent(obj))
}
