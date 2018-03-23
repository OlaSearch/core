import expect from 'expect'
import { MAKE_ACTION, INIT_TYPE, MOCK_SEARCH_ADAPTER, MOCK_CONFIG } from './../common'
import { createOlaMiddleware, createStore } from './../../src'

describe ('Middleware: Ola middleware', () => {
  const NAMESPACE = 'test'
  const doDispatch = () => {};
  const doGetState = () => {};
  const options = {
    config: MOCK_CONFIG,
    parser: MOCK_SEARCH_ADAPTER.Parser(MOCK_CONFIG),
    queryBuilder: MOCK_SEARCH_ADAPTER.QueryBuilder(MOCK_CONFIG),
    searchService: MOCK_SEARCH_ADAPTER.Http(MOCK_CONFIG)
  }
  const middleware = createOlaMiddleware(options)
  const store = createStore({ namespace: NAMESPACE }, MOCK_SEARCH_ADAPTER)
  const nextHandler = middleware({dispatch: doDispatch, getState: store.getState});


  it('should export a fn', () => {
    expect(typeof(createOlaMiddleware)).toBe('function')
  })

  it('must throw error if config is not present', () => {
    expect(createOlaMiddleware()).toThrowError()
  })

  it('handle next', () => {
    const actionHandler = nextHandler()
    expect(actionHandler).toBeInstanceOf(Function)
    expect(actionHandler.length).toBe(1)
  })

  it('must pass action to next if do not have types array', done => {
    const actionObj = {};

    const actionHandler = nextHandler(action => {
      expect(action).toBe(actionObj)
      done();
    });

    actionHandler(actionObj)
  });

  it('must return the return value of next if do not have types array', () => {
    const expected = 'redux';
    const actionHandler = nextHandler(() => expected);

    const outcome = actionHandler();
    expect(outcome).toBe(expected);
  });

  it('must return a promise', () => {
    const expected = 'rocks';
    const next = jest.fn
    const actionHandler = nextHandler(next);

    const actionObj = {
      types: ['A', 'B', 'C'],
      api: 'search'
    }
    const outcome = actionHandler(actionObj)
    expect(Promise.resolve(outcome)).toBe(outcome);
  });

})