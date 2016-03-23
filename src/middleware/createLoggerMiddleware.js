module.exports = (options = {}) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    const {
      log,
      ...rest
    } = action

    if (!log) return next(action)

    const {
      searchService
    } = options

    const { log: olaLogger } = searchService

    if (!olaLogger) return next(action)

    olaLogger(rest)
  }
}
