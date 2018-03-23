### Creating a store

We use [Redux](https://github.com/reactjs/redux) as the state management library. In addition to Redux we also use [thunk middleware](https://github.com/gaearon/redux-thunk)

If you are starting an Ola application from scratch, you can create your redux store using

```js static
import { createStore } from '@olasearch/core'
# Your ola search configuration file which can be downloaded from `admin.olasearch.com`
import config from './olasearch.config'
# If you are using `solr` as the search engine
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'

const store = createStore(config,
  { Parser, QueryBuilder, Http },
  ...your reducers,
  ...middlewares,
  ...store enhancers
)
```


### Integrating with your own application

If you already have a redux app running, you can add Ola Search in your store

```js static
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { olaReducer, createOlaMiddleware, prepareStore } from '@olasearch/core'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import config from './olasearch.config'

const options = {
  config,
  parser: new Parser(config),
  queryBuilder: new QueryBuilder(config),
  searchService: new Http(config),
}
# Create ola middleware
const olaMiddleware = createOlaMiddleware(options)
# Create reducers
const reducers = Object.assign({ }, yourReducer, olaReducer)
# Create redux store
const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk, olaMiddleware)
    )
  )


# Rehydrate your store
const { userSession, searchSession, isNewUser } = prepareStore.prepareStoreState({ config })
finalStore.dispatch({
  type: ActionTypes.OLA_REHYDRATE,
  userSession,
  searchSession,
  isNewUser,
  namespace: config.namespace,
  env: config.env,
  projectId: config.projectId
})
```