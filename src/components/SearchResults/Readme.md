#### Usage

```js
const connect = require('react-redux').connect;
function mapStateToProps (state) {
  return {
    results: state.AppState.results
  }
};
const Results = connect(mapStateToProps)(({ results }) => {
  return (
    <OlaProvider config={olaconfig}>
      <SearchResults
        results={results}
      />
    </OlaProvider>
  )
});
<Results />
```