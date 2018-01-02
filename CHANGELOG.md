Removed some action types from `Context` reducer

````
case types.ADD_CONTEXT:
  return state
case types.ADD_DYNAMIC_FIELD:
  let filtered = state.fields.filter((field) => field.name !== action.name)
  return {
    ...state,
    fields: [
      ...filtered,
      {
        name: action.name,
        value: action.value,
        filename: action.filename
      }
    ]
  }

case types.REMOVE_DYNAMIC_FIELD:
  return {
    ...state,
    fields: state.fields.filter((field) => field.name !== action.name)
  }
````