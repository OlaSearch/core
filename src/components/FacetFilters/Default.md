#### Usage

```js
const connect = require('react-redux').connect;
const SearchFilters = require('./../SearchFilters').default;
function mapStateToProps (state) {
  return {
    AppState: state.AppState,
    QueryState: state.QueryState
  }
};
const Search = connect(mapStateToProps)(({ AppState, QueryState, dispatch }) => {
  return (
    <SearchFilters
      selected={QueryState.facet_query}
      facets={AppState.facets.filter(({ type }) => type === 'string')}
      conditional={false}
      dispatch={dispatch}
    />
  )
});
<Search />
```