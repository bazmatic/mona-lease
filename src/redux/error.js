function error (state = [], action) {
    switch (action.type) {
        case 'addError':
          return [
              ...state, 
              {
                errorType: action.errorType,
                errorMessage: action.errorMessage
              }
          ]
        case 'reset':
          return []
        default:
          return state
      }
}

 
export default error